import React from 'react';
import PropTypes from 'prop-types';

import s from './avatar.module.scss';

const Avatar = ({ avatar, size, className, ...props }) => {
  const style = avatar
    ? {
        backgroundImage: `url(${avatar})`,
        width: `${size}rem`,
        height: `${size}rem`,
      }
    : {
        background: 'lightgray',
        width: `${size}rem`,
        height: `${size}rem`,
      };

  return (
    <div
      className={`${s.avatar} ${className}`}
      style={style}
      {...props}
    />
  );
};

Avatar.propTypes = {
  avatar: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default Avatar;
