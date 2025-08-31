import React from 'react';
import css from './Status.module.css';

const Loader: React.FC = () => (
  <div className={css.loader} role="status">
    <span className={css.spinner}></span>
    <span>Loading...</span>
  </div>
);

export default Loader;
