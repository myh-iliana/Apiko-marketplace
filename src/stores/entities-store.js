import { getRoot, types as t } from 'mobx-state-tree';
import { normalize } from 'normalizr';

import { productsCollection } from './products/products-collection';
import { usersCollection } from './users/users-collection';
import { chatsCollection } from './chats/chats-collection';
import { messagesCollection } from './chats/messages-collection';

export const EntitiesStore = t
  .model('EntitiesStore', {
    products: productsCollection,
    users: usersCollection,
    chats: chatsCollection,
    messages: messagesCollection,
  })
  .actions((store) => ({
    merge(entities) {
      Object.keys(entities).forEach((collectionName) => {
        const collectionEntities = entities[collectionName];

        Object.keys(collectionEntities).forEach((id) => {
          const value = collectionEntities[id];

          store[collectionName].add(id, value);
        });
      });
    },

    normalize(items, schema) {
      const { result, entities } = normalize(items, schema);

      store.merge(entities);

      return result;
    },
  }));
