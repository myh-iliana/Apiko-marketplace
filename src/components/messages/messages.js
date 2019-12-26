import React from 'react';
import PropTypes from 'prop-types';

import s from './messages.module.scss';

export const Error = ({ children }) => {
  return <div className={s.error}>{children}</div>;
};

Error.propTypes = {
  children: PropTypes.node,
};
