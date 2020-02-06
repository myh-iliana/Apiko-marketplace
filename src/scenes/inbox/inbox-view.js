import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Route } from 'react-router-dom';
import { useStore } from '../../stores/create-store';
import { routes } from '../routes';
import Header from '../../components/header/header';
import Chats from './components/chats/chats';
import Messages from './components/messages/messages';

// import s from 'inbox-view.module.scss';

const InboxView = () => {
  const store = useStore();
  const { items, fetch } = store.chats;

  useEffect(() => {
    fetch.run();
  });

  return (
    <>
      <Header />
      <aside>
        <Chats chats={items} />
      </aside>
      <main>
        <Route path={routes.chat} component={Messages} />
      </main>
    </>
  );
};

export default observer(InboxView);
