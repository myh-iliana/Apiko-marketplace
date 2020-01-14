import { types as t } from 'mobx-state-tree';

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
  })
  .actions((store) => ({
    setSaved() {
      store.saved = true;
    },

    removeSaved() {
      store.saved = false;
    },
  }));
