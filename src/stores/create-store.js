import { createContext, useContext } from 'react';
import { onSnapshot } from 'mobx-state-tree';
import { RootStore } from './root-store';
import { createPersist } from './utils';

export const createStore = () => {
  const root = RootStore.create();

  const persist = createPersist(root);
  persist.rehydrate();

  onSnapshot(root, (snapshot) => {
    // console.log(JSON.stringify(snapshot.entities.chats, null, 2));
    // console.log(JSON.stringify(snapshot.chats, null, 2));
  });

  return root;
};

const MSTContext = createContext(null);

// eslint-disable-next-line prefer-destructuring
export const Provider = MSTContext.Provider;

export const useStore = (mapStateToProps) => {
  const store = useContext(MSTContext);

  if (typeof mapStateToProps === 'function') {
    return mapStateToProps(store);
  }

  return store;
};
