import React from 'react';
import PropTypes from 'prop-types';

import s from '../../scenes/product-view/components/sidebar.module.scss';

const Avatar = ({ avatar, size, ...props }) => {
  return (
    <div
      className={s.avatar}
      style={{
        backgroundImage: `url(${avatar})`,
        width: `${size}rem`,
        height: `${size}rem`,
      }}
      {...props}
    />
  );
};

Avatar.propTypes = {
  avatar: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Avatar;
