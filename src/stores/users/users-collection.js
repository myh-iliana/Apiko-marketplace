import { UserModel } from './user-model';
import { AsyncModel, createCollection } from '../utils';
import { useStore } from '../create-store';
import { User } from '../schemas';
import Api from '../../api';

export function useUsersCollection() {
  const store = useStore();

  return store.entities.users;
}

export const usersCollection = createCollection(UserModel, {
  getUser: AsyncModel(getUser),
});

function getUser(id) {
  return async function getUserFlow(flow, parent) {
    let user;
    user = parent.collection.get(id);

    if (!user) {
      const res = await Api.User.getCurrentUser(id);
      user = res.data;
    }

    flow.merge(user, User);
  };
}
