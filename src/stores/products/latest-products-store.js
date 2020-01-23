import { types as t } from 'mobx-state-tree';
import queryString from 'query-string';
import { normalize } from 'normalizr';

import Api from 'src/api';
import { ProductModel } from './product-model';
import { AsyncModel } from '../utils';
import { LatestProductCollection } from '../schemas';

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

function fetchLatest(query) {
  return async function fetchLatestFlow(flow, parentStore, root) {
    const search = queryString.parse(query);
    let res;
    if (query && (search.keywords || search.location)) {
      res = await Api.Products.search(query);
    } else {
      res = await Api.Products.fetchLatest();
    }

    const { result, entities } = normalize(res.data, LatestProductCollection);

    root.entities.merge(entities);
    parentStore.setItems(result);
  };
}
