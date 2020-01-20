import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';

import Header from '../../components/header/header';
import { useStore } from '../../stores/create-store';
import Loader from '../../components/loader/loader';
import List from '../../components/products/list/list';
import Search from './components/search';
import Container from '../../components/container/container';

const Home = () => {
  const store = useStore();
  const { fetchLatest, items } = store.latestProducts;
  const { isLoading } = fetchLatest;
  const { search } = useLocation();

  useEffect(() => {
    if (search) {
      fetchLatest.run(search);
    } else {
      fetchLatest.run();
    }
  }, [search]);

  return (
    <>
      <Header search />
      <Container>
        <Search />
        {isLoading && <Loader />}
        <List items={items} />
      </Container>
    </>
  );
};

export default observer(Home);
