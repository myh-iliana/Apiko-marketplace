import React from 'react';
import PropTypes from 'prop-types';

import s from './button.module.scss';

const Button = ({ children, ...props }) => {
  return (
    <button type="submit" className={s.btn} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
};

export default Button;
