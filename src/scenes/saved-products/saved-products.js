import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { useStore } from '../../stores/create-store';
import Header from '../../components/header/header';
import List from '../../components/products/list/list';
import Loader from '../../components/loader/loader';
import Container from '../../components/container/container';
import s from './saved-products.module.scss';

const SavedProducts = () => {
  const store = useStore();
  const { items, fetchSaved } = store.savedProducts;
  const { isLoading } = fetchSaved;

  useEffect(() => {
    fetchSaved.run();
  }, []);

  return (
    <div>
      <Header search />
      <Container bg>
        <h2 className={s.title}>
          Saved items{' '}
          <span className={s.number}>{`(${items.length})`}</span>
        </h2>
        {isLoading && <Loader />}
        <List items={items} />
      </Container>
    </div>
  );
};

export default observer(SavedProducts);
