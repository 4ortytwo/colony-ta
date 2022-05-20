import { FC, useEffect, useState } from 'react';

import EventsListItem from './EventsListItem';
import { ColonyClient } from '@colony/colony-js';
import { Log } from 'ethers/providers';
import { prepareData } from '../lib';

type EventsListProps = {};

type LogDescription = ReturnType<ColonyClient['interface']['parseLog']>;
export type ParsedLogData = LogDescription &
  Log & {
    date: string;
    rawDate: number;
    userAddress: string;
    tokenAmount?: string;
    fundingPotId?: string;
    copy: { primary: string; secondary: string };
  };

const EventsList: FC<EventsListProps> = () => {
  const [parsedData, setParsedData] = useState<ParsedLogData[]>();

  useEffect(() => {
    (async function () {
      const { data } = await prepareData();
      if (data) {
        setParsedData(data);
      }
    })();
  }, []);

  return (
    <>
      {parsedData &&
        parsedData.length > 0 &&
        parsedData
          .sort((a, b) => b.rawDate - a.rawDate)
          .map((log, index) => <EventsListItem key={`${log.name}-${index}`} log={log} />)}
    </>
  );
};

export default EventsList;
