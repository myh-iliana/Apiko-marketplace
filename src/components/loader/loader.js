import React from 'react';
import PropTypes from 'prop-types';

import s from './loader.module.scss';

const Loader = ({ size = 2, align = false }) => {
  const style = align ? { marginTop: '40vh' } : { marginTop: '2rem' };

  return (
    <section className={s.section} style={style}>
      <div
        className={`${s.container}`}
        style={{ width: `${size * 2}rem` }}
      >
        <span
          className={s.dotOne}
          style={{
            height: `${size / 2}rem`,
            width: `${size / 2}rem`,
          }}
        />
        <span
          className={s.dotTwo}
          style={{
            height: `${size / 2}rem`,
            width: `${size / 2}rem`,
          }}
        />
        <span
          className={s.dotThree}
          style={{
            height: `${size / 2}rem`,
            width: `${size / 2}rem`,
          }}
        />
      </div>
    </section>
  );
};

Loader.propTypes = {
  size: PropTypes.string,
  align: PropTypes.bool,
};

export default Loader;
