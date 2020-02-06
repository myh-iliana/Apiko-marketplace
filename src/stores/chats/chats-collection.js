import { createCollection } from '../utils';
import { useStore } from '../create-store';
import { ChatModel } from './chat-model';

export function useChatsCollection() {
  const store = useStore();

  return store.entities.chats;
}

export const chatsCollection = createCollection(ChatModel);
