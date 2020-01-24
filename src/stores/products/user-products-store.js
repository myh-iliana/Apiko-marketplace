import { types as t } from 'mobx-state-tree';

import Api from 'src/api';
import { ProductModel } from './product-model';
import { AsyncModel } from '../utils';
import { Product, UserProductCollection } from '../schemas';

export const UserProductsStore = t
  .model('UserProductsStore', {
    items: t.array(t.reference(ProductModel)),
    fetchUserProducts: AsyncModel(fetchUserProducts),
    addProduct: AsyncModel(addProduct),
  })
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
  }));

function fetchUserProducts(id) {
  return async function fetchUserProductsFlow(flow, parentStore) {
    const res = await Api.Products.fetchUserProducts(id);
    const result = flow.merge(res.data.list, UserProductCollection);

    parentStore.setItems(result);
  };
}

function addProduct({ title, description, photos, location, price }) {
  return async function addProductFlow(flow, parentStore) {
    const res = await Api.Products.create({
      title,
      description,
      photos,
      location,
      price,
    });
    const result = flow.merge(res.data, Product);

    parentStore.setItems(result);
  };
}
