import { UserModel } from './user-model';
import { AsyncModel, createCollection } from '../utils';
import Api from '../../api';

export const usersCollection = createCollection(UserModel, {
  getUser: AsyncModel(getUser),
});

function getUser(id) {
  return async function getUserFlow(flow, parentStore, root) {
    try {
      const res = await Api.User.getCurrentUser(id);
      root.entities.users.add(res.data.id, res.data);
    } catch (e) {
      console.log(e);
    }

  };
}
