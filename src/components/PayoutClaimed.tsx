import React, { FC } from 'react';
import { ParsedLogData } from './EventsList';
import Avatar from './Avatar';
import { useToken } from '@usedapp/core';
import { isAddress } from '@colony/colony-js/lib/utils';
import { highlight } from '../utils';
import EventsListItemContainer from './EventsListItemContainer';
import EventListItemCopy from './EventListItemCopy';

type PayoutClaimedProps = {
  log: ParsedLogData;
};
// this component was needed to handle token data
const PayoutClaimed: FC<PayoutClaimedProps> = ({ log }) => {
  const token = useToken(isAddress(log?.values?.token) ? log?.values?.token : null);
  return (
    <EventsListItemContainer>
      <Avatar seed={log.userAddress} />
      <EventListItemCopy
        copy={{
          primary: highlight`User ${log.userAddress} claimed ${log?.tokenAmount ?? 'N/A'} ${
            token?.symbol ?? 'NO_SYMBOL'
          } payout from pot ${log?.fundingPotId ?? 'N/A'}.`,
          secondary: log.date,
        }}
      />
    </EventsListItemContainer>
  );
};

export default PayoutClaimed;
