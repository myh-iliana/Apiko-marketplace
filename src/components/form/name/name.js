import React from 'react';
import PropTypes from 'prop-types';

import s from './name.module.scss';

const Name = ({ children }) => {
  return <div className={s.name}>{children}</div>;
};

Name.propTypes = {
  children: PropTypes.node,
};

export default Name;
