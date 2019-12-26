import { getRoot, types as t } from 'mobx-state-tree';
import { AsyncModel } from '../utils';
import Api from '../../api';

export const AuthStore = t.model('AuthStore', {
  login: AsyncModel(loginFlow),
  register: AsyncModel(registerFlow),
});

function loginFlow({ password, email }) {
  return async (flow) => {
    const res = await Api.Auth.login({ password, email });

    Api.Auth.setToken(res.data.token);

    getRoot(flow).viewer.setViewer(res.data.user);
  };
}

function registerFlow({ email, password, fullName }) {
  return async () => {
    await Api.Auth.register({
      email,
      password,
      fullName,
    });
  };
}
