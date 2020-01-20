import { ProductModel } from './product-model';
import { AsyncModel, createCollection } from '../utils';
import Api from '../../api';

export const productsCollection = createCollection(ProductModel, {
  getProduct: AsyncModel(getProduct),
  save: AsyncModel(save),
  removeFromSaved: AsyncModel(removeFromSaved),
});

function getProduct(id) {
  return async function getProductFlow(flow, parentStore, root) {
    const res = await Api.Products.fetchProduct(id);

    root.entities.products.add(res.data.id, res.data);
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
  return async function removeFromSavedProductFlow(
    flow,
    parentStore,
    root,
  ) {
    const item = root.entities.products.collection.get(id);
    item.setSaved(false);
    const res = await Api.Products.removeFromSaved(id);

    if (!res.data.success) {
      item.setSaved(true);
    }
  };
}
