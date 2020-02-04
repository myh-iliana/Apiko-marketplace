import { types as t } from 'mobx-state-tree';
import { ProductModel } from '../products/product-model';
import { MessageModel } from './message-model';

export const ChatModel = t
  .model('ChatModel', {
    id: t.identifierNumber,
    productId: t.number,
    ownerId: t.number,
    createdAt: t.string,
    updatedAt: t.string,
    message: t.reference(MessageModel),
    product: t.reference(ProductModel),
  })
  .preProcessSnapshot((snapshot) => ({
    ...snapshot,
    product: snapshot.product || snapshot.productId,
    participants: undefined,
    user: snapshot.participants[0],
  }));
