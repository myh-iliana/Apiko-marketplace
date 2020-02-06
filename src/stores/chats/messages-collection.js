import { createCollection } from '../utils';
import { useStore } from '../create-store';
import { MessageModel } from './message-model';

export function useMessagesCollection() {
  const store = useStore();

  return store.entities.messages;
}

export const messagesCollection = createCollection(MessageModel);
