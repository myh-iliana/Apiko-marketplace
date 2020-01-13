import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import Header from '../../components/header/header';
import { useStore } from '../../stores/create-store';
import Loader from '../../components/loader/loader';
import Items from '../../components/products/list/list';
import Search from './components/search';
import s from './home.module.scss';

const Home = () => {
  const store = useStore();
  const { fetchLatest, isLoading } = store.latestProducts;

  useEffect(() => {
    fetchLatest.run();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header search />
      <main className={s.container}>
        <Search />
        <Items />
      </main>
    </>
  );
};

export default observer(Home);
