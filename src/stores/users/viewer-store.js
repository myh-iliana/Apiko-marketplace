import { types as t } from 'mobx-state-tree';
import { UserModel } from './user-model';
import { AsyncModel } from '../utils';
import Api from '../../api';

const ViewerModel = UserModel.named('ViewerModel');

export const ViewerStore = t
  .model('ViewerStore', {
    user: t.maybe(ViewerModel),
    userModel: t.maybe(UserModel),
    edit: AsyncModel(editFlow),
  })
  .actions((store) => ({
    setViewer(user) {
      store.user = user;
    },
  }));

function editFlow({ fullName, phone, avatar, location }) {
  return async (flow, parentStore) => {
    const res = await Api.User.edit({
      fullName,
      phone,
      avatar,
      location,
    });
    parentStore.setViewer(res.data);
  };
}
