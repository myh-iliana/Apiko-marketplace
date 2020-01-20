import React from 'react';
import PropTypes from 'prop-types';

import s from './button.module.scss';

const Button = ({ children, className, ...props }) => {
  return (
    <button
      type="submit"
      className={`${s.btn} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Button;
