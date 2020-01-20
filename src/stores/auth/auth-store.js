import { getRoot, types as t } from 'mobx-state-tree';
import { AsyncModel } from '../utils';
import Api from '../../api';

export const AuthStore = t
  .model('AuthStore', {
    login: AsyncModel(loginFlow),
    register: AsyncModel(registerFlow),
    isLoggedIn: false,
  })
  .actions((store) => ({
    setIsLoggedIn(value) {
      store.isLoggedIn = value;
    },

    logout() {
      store.isLoggedIn = false;
      Api.Auth.logout();
    },
  }));

function loginFlow({ password, email }) {
  return async (flow) => {
    const root = getRoot(flow);

    const res = await Api.Auth.login({ password, email });

    Api.Auth.setToken(res.data.token);
    root.viewer.setViewer(res.data.user);
    root.auth.setIsLoggedIn(true);
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
