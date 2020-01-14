import { types as t } from 'mobx-state-tree';

import Api from 'src/api';
import { ProductModel } from './product-model';
import { AsyncModel } from '../utils';

export const SavedProductsStore = t
  .model('LatestProductsStore', {
    items: t.array(t.reference(ProductModel)),
    fetchSaved: AsyncModel(fetchSaved),
  })
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
  }));

function fetchSaved() {
  return async function fetchSavedFlow(flow, parentStore, root) {
    const res = await Api.Products.fetchSaved();

    const ids = res.data.map((item) => {
      root.entities.products.add(item.id, item);
      return item.id;
    });

    parentStore.setItems(ids);
  };
}
