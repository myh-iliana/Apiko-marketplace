import React, { useEffect } from 'react';
import Modal from 'react-modal';

import { Provider, createStore } from 'src/stores/create-store';
import Router from '../../scenes/routes';

import './app.css';

const store = createStore();
Modal.setAppElement('#modalRoot');

const App = () => {
  useEffect(() => {
    store.bootstrap();
  }, []);

  return (
    <div>
      <Provider value={store}>
        <Router />
      </Provider>
    </div>
  );
};

export default App;
