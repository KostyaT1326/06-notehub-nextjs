import React from 'react';
import css from './Status.module.css';

interface StatusInfoProps {
  message: string;
}

const StatusInfo: React.FC<StatusInfoProps> = ({ message }) => (
  <div className={css.info}>
    {message}
  </div>
);

export default StatusInfo;
