import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import EditForm from './components/edit-form';
import { useStore } from '../../stores/create-store';
import Header from '../../components/header/header';
import s from './edit.module.scss';
import { routes } from '../routes';

const Edit = () => {
  const [edited, setEdited] = useState(false);
  const store = useStore();

  const onSubmit = async ({ fullName, phone, avatar, location }) => {
    await store.viewer.edit
      .run({
        fullName,
        phone,
        avatar,
        location,
      })
      .then(() => setEdited(true));
  };

  return (
    <div className={s.container}>
      <Header />
      <EditForm onSubmit={onSubmit} />
      {edited && <Redirect to={routes.account} />}
    </div>
  );
};

export default observer(Edit);
