import { normalize } from 'normalizr';

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
  return async function getUserFlow(flow, parentStore, root) {
    const res = await Api.User.getCurrentUser(id);
    const { entities } = normalize(res.data, User);

    root.entities.merge(entities);
  };
}
