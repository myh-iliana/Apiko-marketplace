import React from 'react';
import { Link } from 'react-router-dom';

import { routes } from '../../scenes/routes';

import { ReactComponent as Logo } from './logo.svg';
import { ReactComponent as Like } from './like.svg';
import { ReactComponent as Inbox } from './inbox.svg';
import { ReactComponent as Ellipse } from './ellipse.svg';
import s from './header.module.scss';

const Header = () => {
  return (
    <div className={s.container}>
      <div>
        <Logo />
      </div>
      <ul className={s.nav}>
        <Link to="/sell">
          <li className={s.sell}>SELL</li>
        </Link>
        <Link to={routes.login} href={routes.login}>
          <li>LOGIN</li>
        </Link>
        <Link to={routes.savedProducts} href={routes.savedProducts}>
          <li className={s.icon}>
            <Like />
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Header;
