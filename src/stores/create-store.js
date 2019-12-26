import { createContext, useContext } from 'react';
import { RootStore } from './root-store';

export const createStore = () => {
  const root = RootStore.create();

  return root;
};

const MSTContext = createContext(null);

// eslint-disable-next-line prefer-destructuring
export const Provider = MSTContext.Provider;

export const useStore = (mapStateToProps) => {
  const store = useContext(MSTContext);

  if (mapStateToProps === 'function') {
    return mapStateToProps(store);
  }

  return store;
};
