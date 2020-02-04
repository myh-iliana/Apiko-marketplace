import React, { useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';

import Header from '../../components/header/header';
import { useStore } from '../../stores/create-store';
import List from '../../components/products/list/list';
import Loader from '../../components/loader/loader';
import User from './components/user';
import Container from '../../components/container/container';
import { routes } from '../routes';
import { useUsersCollection } from '../../stores/users/users-collection';

const Account = () => {
  const store = useStore();
  const { items, fetchUserProducts } = store.userProducts;
  const { isLoading } = fetchUserProducts;
  const { userId } = useParams();
  // const { getUser } = useUsersCollection();
  // const user = getUser.run(userId);
  // console.log('user', user);

  useEffect(() => {
    fetchUserProducts.run(userId);
    // console.log(!!user && !user?.ownProducts.items);
    // if (user && !user?.ownProducts.items) user.ownProducts.fetchUserProducts.run(userId);
  }, []);

  // if (!user) {
  //   return <h1>Loading...</h1>;
  // }

  // const { fetchUserProducts, items } = user?.ownProducts;
  // const { isLoading } = fetchUserProducts;

  return (
    <>
      <Header search />
      <Container bg center style={{ width: '900px' }}>
        <User listings={items.length} />
        <Route
          path={routes.userProducts}
          render={() => (isLoading ? <Loader /> : <List items={items} />)}
        />
      </Container>
    </>
  );
};

export default observer(Account);
