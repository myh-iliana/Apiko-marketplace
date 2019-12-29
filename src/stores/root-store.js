import { flow, types as t } from 'mobx-state-tree';

import Api from 'src/api';
import { AuthStore } from './auth/auth-store';
import { ViewerStore } from './viewer-store';
import { LatestProductsStore } from './products/latest-store-products';

export const RootStore = t
  .model('RootStore', {
    auth: t.optional(AuthStore, {}),
    viewer: t.optional(ViewerStore, {}),
    latestProducts: t.optional(LatestProductsStore, {}),
  })
  .actions((store) => ({
    bootstrap: flow(function* bootstrap() {
      try {
        const token = localStorage.getItem('_token');
        Api.Auth.setToken(token);

        if (token) {
          store.auth.setIsLoggedIn(true);
          const res = yield Api.User.getUser(token);
          store.viewer.setViewer(res.data);
        } else {
          store.auth.setIsLoggedIn(false);
          store.viewer.setViewer(undefined);
          Api.Auth.logout();
        }
      } catch (err) {
        store.auth.setIsLoggedIn(false);
        store.viewer.setViewer(undefined);
        Api.Auth.logout();
      }
    }),
  }));
