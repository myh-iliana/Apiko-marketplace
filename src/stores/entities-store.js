import { types as t } from 'mobx-state-tree';
import { productsCollection } from './products/products-collection';
import { usersCollection } from './users/users-collection';

export const EntitiesStore = t
  .model('EntitiesStore', {
    products: productsCollection,
    users: usersCollection,
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
  }));
