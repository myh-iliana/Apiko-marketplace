import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import s from './bottom.module.scss';

const Bottom = ({ text, link, to }) => {
  return (
    <div className={s.bottom}>
      <span className={s.text}>{text}</span>
      <Link to={to} href={to} className={s.link}>
        {link}
      </Link>
    </div>
  );
};

Bottom.propTypes = {
  text: PropTypes.node,
  link: PropTypes.node,
  to: PropTypes.string,
};

export default Bottom;
