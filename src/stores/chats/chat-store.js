import { types as t } from 'mobx-state-tree';
import { ChatModel } from './chat-model';
import { AsyncModel } from '../utils';
import * as Api from '../../api/api';
import { ChatCollection } from '../schemas';

export const ChatStore = t
  .model('ChatStore', {
    items: t.array(t.reference(ChatModel)),
    fetch: AsyncModel(fetchChats),
  })
  .views((store) => ({
    getById(id) {
      return store.items.find((item) => item.id === +id);
    },
  }))
  .actions((store) => ({
    setItems(value) {
      store.items = value;
    },

    handleMessage(message) {
      if (message.type === 'ADD') {
        const chat = store.getById(message.message.chatId);

        if (typeof chat !== 'undefined') {
          chat.messages.addMessage(message.message);
        }
      }
    },
  }));

function fetchChats() {
  return async function fetchChatsFlow(flow, store) {
    const res = await Api.Chats.getList();

    const result = flow.merge(res.data, ChatCollection);

    store.setItems(result);
  };
}
