import React, { FC, ReactNode } from 'react';
import './EventListItemCopy.css';

type EventListItemCopyProps = {
  children?: ReactNode;
  copy: { primary: string; secondary: string };
};

const EventListItemCopy: FC<EventListItemCopyProps> = ({ copy }) => {
  return (
    <div className="EventListItemCopy">
      <p className="EventListItemCopy-primary" dangerouslySetInnerHTML={{ __html: copy.primary }} />
      <span className="EventListItemCopy-secondary">{copy.secondary}</span>
    </div>
  );
};

export default EventListItemCopy;
