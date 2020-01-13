import { types as t } from 'mobx-state-tree';
import { AsyncModel } from './utils';
import Api from '../api';

export const FileStore = t
  .model('FileStore', {
    upload: AsyncModel(fileFlow),
    uploadedFile: t.maybeNull(t.string),
  })
  .actions((store) => ({
    setUploadedFile(value) {
      store.uploadedFile = value;
    },
  }));

function fileFlow(file) {
  return async (flow, parentStore, root) => {
    // eslint-disable-next-line no-undef
    const data = new FormData();
    data.append('image', file, file.fileName);
    const res = await Api.File.upload(data);
    parentStore.setUploadedFile(res.data);
  };
}
