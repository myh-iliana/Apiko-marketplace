import React from 'react';

import RegisterForm from './components/register-form';
import { useStore } from '../../stores/create-store';

const Register = () => {
  const store = useStore();

  const onSubmit = async ({ email, fullName, password }) => {
    await store.auth.register.run({
      email,
      fullName,
      password,
    });
  };

  return <RegisterForm onSubmit={onSubmit} />;
};

export default Register;
