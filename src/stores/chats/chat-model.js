import { types as t } from 'mobx-state-tree';
import { ProductModel } from '../products/product-model';
import { MessageModel } from './message-model';
import { AsyncModel } from '../utils';
import * as Api from '../../api/api';
import { Message } from '../schemas';
import { UserModel } from '../users/user-model';
import { MessageStore } from './message-store';

export const ChatModel = t
  .model('ChatModel', {
    id: t.identifierNumber,
    productId: t.number,
    ownerId: t.number,
    createdAt: t.string,
    updatedAt: t.string,
    message: t.reference(MessageModel),
    product: t.reference(ProductModel),

    messages: t.optional(MessageStore, {}),
    // user: t.reference(UserModel),

    sendMessage: AsyncModel(sendMessage),
  })
  .actions((store) => ({
    setMessage(value) {
      store.message = value;
    },
  }))
  .preProcessSnapshot((snapshot) => ({
    ...snapshot,
    product: snapshot.product || snapshot.productId,
    participants: undefined,
    user: snapshot.participants[0],
  }));

function sendMessage(text) {
  return async function sendMessageFlow(flow, store) {
    const res = await Api.Chats.sendMessage(store.id, text);
    const result = flow.merge(res.data, Message);
    console.log(result);
    store.setMessage(result);
  };
}
