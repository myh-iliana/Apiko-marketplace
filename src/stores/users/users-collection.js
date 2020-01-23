import { UserModel } from './user-model';
import { AsyncModel, createCollection } from '../utils';
import { useStore } from '../create-store';
import Api from '../../api';

export function useUsersCollection() {
  const store = useStore();
  return store.entities.users;
}

export const usersCollection = createCollection(UserModel, {
  getUser: AsyncModel(getUser),
});

function getUser(id) {
  return async function getUserFlow(flow, parentStore, root) {
    const res = await Api.User.getCurrentUser(id);
    root.entities.users.add(res.data.id, res.data);
  };
}
