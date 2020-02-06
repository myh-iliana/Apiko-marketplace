import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { generatePath, Link } from 'react-router-dom';

import { useStore } from '../../../../stores/create-store';
import { routes } from '../../../routes';
import s from './chats.module.scss';

const Chats = ({ chats }) => {
  return (
    <ul className={s.container}>
      {chats.map((chat) => (
        <Link to={generatePath(routes.chat, { chatId: chat.id })}>
          <li key={chat.id}>{chat.id}</li>
        </Link>
      ))}
    </ul>
  );
};

Chats.propTypes = {
  chats: PropTypes.array,
};

export default observer(Chats);
