import { getSnapshot, types as t } from 'mobx-state-tree';
import { UserModel } from '../users/user-model';
import { AsyncModel } from '../utils';
import * as Api from '../../api/api';
import { Chat } from '../schemas';

export const ProductModel = t
  .model('ProductModel', {
    id: t.identifierNumber,
    ownerId: t.number,
    title: t.string,
    description: t.maybeNull(t.string),
    photos: t.maybeNull(t.array(t.string)),
    location: t.string,
    price: t.number,
    saved: false,
    createdAt: t.string,
    updatedAt: t.string,

    owner: t.safeReference(t.late(() => UserModel)),
    createChat: AsyncModel(createChat, false),
  })
  .actions((store) => ({
    setSaved(value) {
      store.saved = value;
    },
  }));

function createChat(message) {
  return async function createChatFlow(flow, store) {
    let chatId;
    try {
      flow.start();
      const res = await Api.Chats.create(store.id, message);
      chatId = res.data.id;

      res.data.participants = [getSnapshot(store.owner)];

      flow.merge(res.data, Chat);

      flow.success();
    } catch (err) {
      flow.error(err);

      throw err;
    }

    return chatId;
  };
}
