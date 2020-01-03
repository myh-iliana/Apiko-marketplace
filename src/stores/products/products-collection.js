import { ProductModel } from './product-model';
import { AsyncModel, createCollection } from '../utils';
import Api from '../../api';

export const productsCollection = createCollection(ProductModel, {
  getProduct: AsyncModel(getProduct),
});

function getProduct(id) {
  return async function getProductFlow(flow, parentStore, root) {
    const res = await Api.Products.fetchProduct(id);

    root.entities.products.add(res.data.id, res.data);
  };
}
