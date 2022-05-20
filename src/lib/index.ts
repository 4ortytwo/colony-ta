import { ColonyClient, ColonyRole, getBlockTime, getLogs } from '@colony/colony-js';
import { getColonyClient, provider } from './client';
import { EventFilter, utils } from 'ethers';
import { ParsedLogData } from '../components/EventsList';
import { highlight } from '../utils';

// ColonyRoleSet was missing in the ColonyClient
type ExtendedColonyClient = ColonyClient & {
  filters: ColonyClient['filters'] & { ColonyRoleSet: () => EventFilter };
};

const prepareData = async () => {
  //@ts-ignore not the best solution here :D
  const colonyClient: ExtendedColonyClient = await getColonyClient();
  const filters = [
    colonyClient.filters.ColonyInitialised(null, null),
    colonyClient.filters.PayoutClaimed(null, null, null),
    colonyClient.filters.DomainAdded(null),
    colonyClient.filters.ColonyRoleSet(),
  ];

  // go over filters
  const data = await filters.reduce<Promise<ParsedLogData[]>>(async (acc, current) => {
    // get raw event logs corresponding to the current filter
    const rawEventLogs = await getLogs(colonyClient, current);
    // parse logs
    const parsedLogs = await Promise.all(
      rawEventLogs.map(async (event) => {
        const copy = {
          primary: '',
          secondary: '',
        };
        // parse current log
        const parsedLog = colonyClient.interface.parseLog(event);

        // set default values
        let userAddress = parsedLog.values?.userAddress ?? '0x3E828ac5C480069D4765654Fb4b8733b910b13b2';
        let tokenAmount = null;
        let fundingPotId = null;
        // retrieve & format date
        const rawDate = await getBlockTime(provider, event?.blockHash ?? '');
        const date = new Date(rawDate).toLocaleString('en-UK', {
          day: 'numeric',
          month: 'short',
        });
        // set secondary copy value
        copy.secondary = date;

        // set primary copy values according to event type/name
        if (parsedLog.name === 'ColonyInitialised') {
          copy.primary = "Congratulations! It's a beautiful baby colony!";
        }
        if (parsedLog.name === 'ColonyRoleSet') {
          copy.primary = highlight`${
            Object.values(ColonyRole)[parsedLog.values.role]
          } role assigned to user ${userAddress} in domain ${parsedLog.values.domainId}.`;
        }
        if (parsedLog.name === 'DomainAdded') {
          copy.primary = highlight`Domain ${parsedLog.values.domainId} added.`;
        }
        // handle PayoutClaimed, let's consider this an edge case :D
        if (parsedLog.name === 'PayoutClaimed') {
          fundingPotId = new utils.BigNumber(parsedLog.values.fundingPotId).toString();
          const { associatedTypeId } = await colonyClient.getFundingPot(fundingPotId);
          const { recipient } = await colonyClient.getPayment(associatedTypeId);
          userAddress = recipient;
          // format tokenAmount
          const humanReadableAmount = new utils.BigNumber(parsedLog.values.amount);
          const wei = new utils.BigNumber(10);

          tokenAmount = humanReadableAmount.div(wei.pow(18)).toString();
        }

        return {
          ...event,
          ...parsedLog,
          rawDate,
          date,
          userAddress,
          ...(tokenAmount ? { tokenAmount } : {}),
          ...(fundingPotId ? { fundingPotId } : {}),
          copy,
        };
      }),
    );

    return [...(await acc), ...parsedLogs];
  }, Promise.resolve([]));

  return { data };
};
export { prepareData };
