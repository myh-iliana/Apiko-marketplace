import { normalize } from 'normalizr';

import { ProductModel } from './product-model';
import { AsyncModel, createCollection } from '../utils';
import { useStore } from '../create-store';
import Api from '../../api';
import { Product } from '../schemas';

export function useProductsCollection() {
  const store = useStore();
  return store.entities.products;
}

export const productsCollection = createCollection(ProductModel, {
  getProduct: AsyncModel(getProduct),
  save: AsyncModel(save),
  removeFromSaved: AsyncModel(removeFromSaved),
});

function getProduct(id) {
  return async function getProductFlow(flow, parent, root) {
    const res = await Api.Products.fetchProduct(id);

    const { entities } = normalize(res.data, Product);

    root.entities.users.add(res.data.owner.id, res.data.owner);
    root.entities.merge(entities);
  };
}

function save(id) {
  return async function saveProductFlow(flow, parent, root) {
    const item = root.entities.products.collection.get(id);
    item.setSaved(true);
    const res = await Api.Products.save(id);

    if (!res.data.success) {
      item.setSaved(false);
    }
  };
}

function removeFromSaved(id) {
  return async function removeFromSavedProductFlow(flow, parentStore, root) {
    const item = root.entities.products.collection.get(id);
    item.setSaved(false);
    const res = await Api.Products.removeFromSaved(id);

    if (!res.data.success) {
      item.setSaved(true);
    }
  };
}
