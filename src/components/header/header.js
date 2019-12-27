import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import { routes } from '../../scenes/routes';
import { useStore } from '../../stores/create-store';
import Dropdown from './dropdown/dropdown';
import { ReactComponent as Logo } from './logo.svg';
import { ReactComponent as Like } from './like.svg';
import { ReactComponent as Inbox } from './inbox.svg';
import { ReactComponent as Ellipse } from './ellipse.svg';
import s from './header.module.scss';

const Header = () => {
  const store = useStore();
  const { isLoggedIn } = store.auth;

  const render = isLoggedIn ? (
    <li className={s.avatar}>
      <Dropdown />
    </li>
  ) : (
    <Link to={routes.login} href={routes.login}>
      <li>LOGIN</li>
    </Link>
  );

  return (
    <div className={s.container}>
      <div>
        <Logo />
      </div>
      <ul className={s.nav}>
        <Link to={routes.savedProducts} href={routes.savedProducts}>
          <li className={s.sell}>SELL</li>
        </Link>
        {render}
        <Link to={routes.savedProducts} href={routes.savedProducts}>
          <li className={s.like}>
            <Like />
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default observer(Header);
