import React from 'react';
import { BrowserRouter, Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import queryString from 'query-string';

import { useStore } from '../stores/create-store';
import Auth from './auth/auth';
import Home from './home/home';
import Edit from './edit/edit';
import Account from './account/account';
import ProductView from './product-view/product-view';
import SavedProducts from './saved-products/saved-products';
import AddProduct from './add-product/add-product';
import InboxView from './inbox/inbox-view';

export const routes = {
  home: '/',
  auth: '/auth',
  login: '/auth/login',
  register: '/auth/register',
  restore: '/auth/restore',
  product: '/products/:productId',
  savedProducts: '/saved',
  account: '/profile/:userId',
  userProducts: `/profile/:userId/products`,
  userFeedbacks: `/profile/:userId/feedbacks`,
  userSales: `/profile/:userId/sales`,
  editAccount: '/account/edit',
  addProduct: '/product/add',
  inbox: '/inbox',
  chat: '/inbox/:chatId',
};

export const useQuery = () => {
  const { search } = useLocation();
  const history = useHistory();
  const parsed = queryString.parse(search);

  const submit = (params) => {
    const query = `?${queryString.stringify({
      ...parsed,
      ...params,
    })}`;
    history.push({ search: query });

    return query;
  };

  return { submit };
};

const PrivateRoute = observer(({ component: Component, ...props }) => {
  const store = useStore();
  const { isLoggedIn } = store.auth;

  return (
    <Route
      {...props}
      render={({ ...renderProps }) =>
        isLoggedIn ? <Component {...renderProps} /> : <Redirect to={routes.login} />
      }
    />
  );
});

const LoggedInPrivateRoute = observer(({ component: Component, ...props }) => {
  const store = useStore();
  const { isLoggedIn } = store.auth;

  return (
    <Route
      {...props}
      render={({ ...renderProps }) =>
        isLoggedIn ? <Redirect to={routes.home} /> : <Component {...renderProps} />
      }
    />
  );
});

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <LoggedInPrivateRoute path={routes.auth} component={Auth} />
        <PrivateRoute path={routes.editAccount} component={Edit} />
        <PrivateRoute path={routes.account} component={Account} />
        <Route exact path={routes.product} component={ProductView} />
        <PrivateRoute path={routes.savedProducts} component={SavedProducts} />
        <PrivateRoute exact path={routes.addProduct} component={AddProduct} />
        <PrivateRoute path={routes.inbox} component={InboxView} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
