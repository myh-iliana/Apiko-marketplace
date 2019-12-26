import React from 'react';
import { observer } from 'mobx-react';

import LoginForm from './components/login-form';

import { useStore } from '../../stores/create-store';

const Login = () => {
  const store = useStore();

  const onSubmit = async ({ email, password }) => {
    await store.auth.login.run({
      email,
      password,
    });
  };

  return <LoginForm onSubmit={onSubmit} />;
};

export default observer(Login);
