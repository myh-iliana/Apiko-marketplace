import { types as t } from 'mobx-state-tree';
import { UserModel } from './user-model';

export const ViewerStore = t
  .model('ViewerStore', {
    user: t.maybeNull(UserModel),
  })
  .actions((store) => ({
    setViewer(user) {
      store.user = user;
    },
  }));
