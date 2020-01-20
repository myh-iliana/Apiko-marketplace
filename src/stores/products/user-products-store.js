import { types as t } from 'mobx-state-tree';

import Api from 'src/api';
import { ProductModel } from './product-model';
import { AsyncModel } from '../utils';

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
  return async function fetchUserProductsFlow(
    flow,
    parentStore,
    root,
  ) {
    const res = await Api.Products.fetchUserProducts(id);

    const ids = res.data.list.map((item) => {
      root.entities.products.add(item.id, item);
      return item.id;
    });

    parentStore.setItems(ids);
  };
}

function addProduct({ title, description, photos, location, price }) {
  return async function addProductFlow(flow, parentStore, root) {
    const res = await Api.Products.create({
      title,
      description,
      photos,
      location,
      price,
    });

    const item = res.data;

    root.entities.products.add(item.id, item);

    parentStore.setItems(item.id);
  };
}
