import { types as t } from 'mobx-state-tree';

import Api from 'src/api';
import { ProductModel } from './product-model';
import { AsyncModel } from '../utils';
import { SavedProductCollection } from '../schemas';

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
  return async function fetchSavedFlow(flow, parentStore) {
    const res = await Api.Products.fetchSaved();
    const result = flow.merge(res.data, SavedProductCollection);

    parentStore.setItems(result);
  };
}
