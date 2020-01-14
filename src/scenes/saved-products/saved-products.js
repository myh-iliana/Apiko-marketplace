import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { useStore } from '../../stores/create-store';
import Header from '../../components/header/header';
import List from '../../components/products/list/list';
import Loader from '../../components/loader/loader';

const SavedProducts = () => {
  const store = useStore();
  const { items, fetchSaved, isLoading } = store.savedProducts;

  useEffect(() => {
    fetchSaved.run();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Header search />
      <List items={items} />
    </div>
  );
};

export default observer(SavedProducts);
