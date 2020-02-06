import { getParent, getRoot, types as t } from 'mobx-state-tree';
import { MessageModel } from './message-model';
import { Message, MessageCollection } from '../schemas';
import { AsyncModel } from '../utils';
import * as Api from '../../api/api';

export const MessageStore = t
  .model('MessageStore', {
    items: t.array(t.reference(MessageModel)),

    fetch: AsyncModel(fetchMessages),
  })
  .views((store) => ({
    get asList() {
      return store.items.slice().reverse();
    },

    get chatId() {
      return getParent(store).id;
    },
  }))
  .actions((store) => ({
    addMessage(message) {
      const result = getRoot(store).entities.normalize(message, Message);

      store.items.unshift(result);
    },

    setItems(value) {
      store.items = value;
    },
  }));

function fetchMessages() {
  return async function fetchMessagesFlow(flow, store) {
    const res = await Api.Chats.getMessages(store.chatId);

    const result = flow.merge(res.data, MessageCollection);

    store.setItems(result);
  };
}
