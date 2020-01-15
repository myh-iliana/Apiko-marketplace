/* eslint-disable no-undef */
import { types as t } from 'mobx-state-tree';

import { AsyncModel } from '../utils';
import Api from '../../api';

export const FilesStore = t
  .model('FilesStore', {
    upload: AsyncModel(fileFlow),
    items: t.optional(t.array(t.string), []),
  })
  .actions((store) => ({
    setItems(value) {
      store.items = value;
    },
  }));

function fileFlow(files) {
  return async (flow, parentStore, root) => {
    const filesArray = Object.values(files);

    let items = [];
    filesArray.forEach(async (file) => {
      const data = new FormData();
      data.append('image', file, file.fileName);
      const res = await Api.File.upload(data);
      items = [...items, res.data];
      parentStore.setItems(items);
    });
  };
}
