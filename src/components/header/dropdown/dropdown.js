import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import Avatar from '../svg/avatar';
import { routes } from '../../../scenes/routes';
import { useStore } from '../../../stores/create-store';
import s from './dropdown.module.scss';

const Dropdown = () => {
  const [show, setShow] = useState(false);
  const store = useStore();
  const { user } = store.viewer;
  const { logout } = store.auth;

  const toggleDropdown = () => setShow(!show);
  const logOut = () => {
    logout();
    toggleDropdown();
  };

  return (
    <div className={s.dropdown}>
      <Avatar size="40" onClick={toggleDropdown} />
      <div className={`${s.dropdownContent} ${show && s.show}`}>
        <div className={s.items}>
          <Avatar size="50" />
          <div className={s.info}>
            <span className={s.name}>{user.fullName}</span>
            <span className={s.email}>{user.email}</span>
            <Link
              to={routes.account}
              href={routes.account}
              className={s.link}
              onClick={toggleDropdown}
            >
              Profile
            </Link>
          </div>
        </div>
        <div className={s.btns}>
          <Link
            to={routes.editAccount}
            href={routes.editAccount}
            onClick={toggleDropdown}
            className={s.btn}
            role="link"
          >
            Edit profile
          </Link>
          <Link
            to={routes.login}
            href={routes.login}
            className={s.btn}
            onClick={logOut}
            role="link"
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default observer(Dropdown);
