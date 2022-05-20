import React, { FC, ReactNode } from 'react';
import './EventsListItemContainer.css';
type EventsListItemContainerProps = { children?: ReactNode };

const EventsListItemContainer: FC<EventsListItemContainerProps> = ({ children }) => {
  return <div className="EventsListItemContainer">{children}</div>;
};

export default EventsListItemContainer;
