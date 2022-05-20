import { FC, memo } from 'react';
import Avatar from './Avatar';
import { ParsedLogData } from './EventsList';
import PayoutClaimed from './PayoutClaimed';
import EventsListItemContainer from './EventsListItemContainer';
import EventListItemCopy from './EventListItemCopy';

type EventsListItemProps = {
  log: ParsedLogData;
};

const EventsListItem: FC<EventsListItemProps> = ({ log }) => {
  switch (log.name) {
    case 'PayoutClaimed':
      return <PayoutClaimed log={log} />;
    default:
      return (
        <EventsListItemContainer>
          <Avatar seed={log.userAddress} />
          <EventListItemCopy copy={{ primary: log.copy.primary, secondary: log.copy.secondary }} />
        </EventsListItemContainer>
      );
  }
};

export default memo(EventsListItem);
