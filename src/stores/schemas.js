import { schema } from 'normalizr';

export const User = new schema.Entity('users');
export const Product = new schema.Entity('products', {
  owner: User,
});
export const LatestProduct = new schema.Entity('products');
export const SavedProduct = new schema.Entity('products');
export const UserProduct = new schema.Entity('products');
export const LatestProductCollection = [LatestProduct];
export const SavedProductCollection = [SavedProduct];
export const UserProductCollection = [UserProduct];

export const Message = new schema.Entity('messages');
export const Chat = new schema.Entity('chats', {
  message: Message,
  product: Product,
  participants: [User],
});
