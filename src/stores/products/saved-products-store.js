import { types as t } from 'mobx-state-tree';
import { normalize } from 'normalizr';

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
  return async function fetchSavedFlow(flow, parentStore, root) {
    const res = await Api.Products.fetchSaved();

    const { result, entities } = normalize(res.data, SavedProductCollection);

    root.entities.merge(entities);
    parentStore.setItems(result);
  };
}
