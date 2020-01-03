import { types as t } from 'mobx-state-tree';
import { productsCollection } from './products/products-collection';

export const EntitiesStore = t.model('EntitiesStore', {
  products: productsCollection,
});
