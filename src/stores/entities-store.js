import { types as t } from 'mobx-state-tree';
import { productsCollection } from './products/products-collection';
import { usersCollection } from './users/users-collection';

export const EntitiesStore = t.model('EntitiesStore', {
  products: productsCollection,
  users: usersCollection,
});
