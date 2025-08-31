import React from 'react';
import css from './Status.module.css';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className={css.error} role="alert">
    {message}
  </div>
);

export default ErrorMessage;
