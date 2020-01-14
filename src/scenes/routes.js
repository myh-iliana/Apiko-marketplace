import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { observer } from 'mobx-react';

import Auth from './auth/auth';
import ProductView from './product-view/product-view';
import Home from './home/home';
import Edit from './edit/edit';
import Footer from '../components/footer/footer';
import { useStore } from '../stores/create-store';
import SavedProducts from './saved-products/saved-products';

export const routes = {
  home: '/',
  auth: '/auth',
  login: '/auth/login',
  register: '/auth/register',
  restore: '/auth/restore',
  product: '/products/:productId',
  savedProducts: '/saved',
  account: '/account',
  editAccount: '/account/edit',
  sell: '/sell',
};

const PrivateRoute = observer(
  ({ component: Component, ...props }) => {
    const store = useStore();
    const { isLoggedIn } = store.auth;

    return (
      <Route
        {...props}
        render={({ ...renderProps }) =>
          isLoggedIn ? (
            <Component {...renderProps} />
          ) : (
            <Redirect to={routes.login} />
          )
        }
      />
    );
  },
);

const LoggedInPrivateRoute = observer(
  ({ component: Component, ...props }) => {
    const store = useStore();
    const { isLoggedIn } = store.auth;

    return (
      <Route
        {...props}
        render={({ ...renderProps }) =>
          isLoggedIn ? (
            <Redirect to={routes.home} />
          ) : (
            <Component {...renderProps} />
          )
        }
      />
    );
  },
);

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <LoggedInPrivateRoute path={routes.auth} component={Auth} />
        <PrivateRoute path={routes.editAccount} component={Edit} />
        <Route path={routes.product} component={ProductView} />
        <PrivateRoute
          path={routes.savedProducts}
          component={SavedProducts}
        />
      </Switch>
      {/*<Footer />*/}
    </BrowserRouter>
  );
};

export default Router;
