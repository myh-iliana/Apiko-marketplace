import { types as t } from 'mobx-state-tree';

import Api from 'src/api';
import { ProductModel } from './product-model';
import { AsyncModel } from '../utils';

export const LatestProductsStore = t
  .model('LatestProductsStore', {
    items: t.array(t.reference(ProductModel)),
    fetchLatest: AsyncModel(fetchLatest),
  })
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
  }));

function fetchLatest() {
  return async function fetchLatestFlow(flow, parentStore, root) {
    const res = await Api.Products.fetchLatest();

    const ids = res.data.map((item) => {
      root.entities.products.add(item.id, item);
      return item.id;
    });

    parentStore.setItems(ids);
  };
}
