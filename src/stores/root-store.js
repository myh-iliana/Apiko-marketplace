import { flow, types as t } from 'mobx-state-tree';

import Api from 'src/api';
import { AuthStore } from './auth/auth-store';
import { ViewerStore } from './users/viewer-store';
import { LatestProductsStore } from './products/latest-products-store';
import { EntitiesStore } from './entities-store';
import { FileStore } from './file-store';

export const RootStore = t
  .model('RootStore', {
    auth: t.optional(AuthStore, {}),
    viewer: t.optional(ViewerStore, {}),
    latestProducts: t.optional(LatestProductsStore, {}),
    file: t.optional(FileStore, {}),

    entities: t.optional(EntitiesStore, {}),
  })
  .actions((store) => ({
    bootstrap: flow(function* bootstrap() {
      try {
        // eslint-disable-next-line no-undef
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
