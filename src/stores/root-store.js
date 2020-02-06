import { flow, types as t } from 'mobx-state-tree';

import Api, { SocketApi } from 'src/api';
import { AuthStore } from './auth/auth-store';
import { ViewerStore } from './users/viewer-store';
import { LatestProductsStore } from './products/latest-products-store';
import { SavedProductsStore } from './products/saved-products-store';
import { UserProductsStore } from './products/user-products-store';
import { EntitiesStore } from './entities-store';
import { FilesStore } from './files/files-store';
import { ChatStore } from './chats/chat-store';

export const RootStore = t
  .model('RootStore', {
    auth: t.optional(AuthStore, {}),
    viewer: t.optional(ViewerStore, {}),

    latestProducts: t.optional(LatestProductsStore, {}),
    savedProducts: t.optional(SavedProductsStore, {}),
    userProducts: t.optional(UserProductsStore, {}),

    chats: t.optional(ChatStore, {}),
    files: t.optional(FilesStore, {}),

    entities: t.optional(EntitiesStore, {}),
  })
  .actions((store) => ({
    bootstrap: flow(function* bootstrap() {
      try {
        // eslint-disable-next-line no-undef
        const token = localStorage.getItem('_token');
        Api.Auth.setToken(token);
        SocketApi.init(token);

        if (token) {
          store.auth.setIsLoggedIn(true);
          const res = yield Api.User.getUser(token);
          store.viewer.setViewer(res.data);
          store.subscribeToEvents();
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

    subscribeToEvents() {
      SocketApi.handleMessages((message) => {
        console.log('message', message);
        store.chats.handleMessage(message);
      });
    },
  }));
