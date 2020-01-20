import React, { useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import { routes } from '../../../scenes/routes';
import { useStore } from '../../../stores/create-store';
import s from './dropdown.module.scss';
import Avatar from '../../avatar/avatar';

const Dropdown = () => {
  const [show, setShow] = useState(false);
  const store = useStore();
  const { user } = store.viewer;
  const { logout } = store.auth;
  const link = generatePath(routes.account, {
    userId: user.id,
  });

  const toggleDropdown = () => setShow(!show);
  const logOut = () => {
    logout();
    toggleDropdown();
  };

  return (
    <div className={s.dropdown}>
      <Avatar
        size={2.5}
        onClick={toggleDropdown}
        avatar={user.avatar}
      />
      <div className={`${s.dropdownContent} ${show && s.show}`}>
        <div className={s.items}>
          <Avatar size="3.125" avatar={user.avatar} />
          <div className={s.info}>
            <span className={s.name}>{user.fullName}</span>
            <span className={s.email}>{user.email}</span>
            <Link
              to={link}
              href={link}
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
