import React, { useEffect, useState } from 'react';

import { Provider, createStore } from 'src/stores/create-store';
import Router from '../../scenes/routes';

import './app.css';
import Loader from '../loader/loader';

const store = createStore();

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    store.bootstrap().then(() => setLoading(false));
  }, []);

  if (loading) return <Loader size="6" align />;

  return (
    <div>
      <Provider value={store}>
        <Router />
      </Provider>
    </div>
  );
};

export default App;
