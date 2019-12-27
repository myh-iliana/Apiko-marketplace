import React, { useEffect } from 'react';

import { Provider, createStore } from 'src/stores/create-store';
import Router from '../../scenes/routes';

import './app.css';

const store = createStore();

const App = () => {
  useEffect(() => {
    store.bootstrap();
  }, []);

  console.log(JSON.stringify(store, null, 2));

  return (
    <div>
      <Provider value={store}>
        <Router />
      </Provider>
    </div>
  );
};

export default App;
