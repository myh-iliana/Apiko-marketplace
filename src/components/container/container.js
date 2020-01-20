import React from 'react';
import PropTypes from 'prop-types';

import s from './container.module.scss';

const Container = ({ children, bg = false, center = false , ...props}) => {
  return (
    <main className={s.container}>
      <div className={`${bg && s.content} ${center && s.center}`} {...props}>
        {children}
      </div>
    </main>
  );
};

Container.propTypes = {
  children: PropTypes.node,
  bg: PropTypes.bool,
  center: PropTypes.bool,
};

export default Container;
