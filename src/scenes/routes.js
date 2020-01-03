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
import Footer from '../components/footer/footer';
import Home from './home/home';
import { useStore } from '../stores/create-store';

export const routes = {
  home: '/',
  auth: '/auth',
  login: '/auth/login',
  register: '/auth/register',
  restore: '/auth/restore',
  product: '/products/:productId',
  savedProducts: '/products/saved',
  account: '/account',
  editAccount: '/account/edit',
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
        <PrivateRoute path={routes.auth} component={Auth} />
        <Route path={routes.product} component={ProductView} />
      </Switch>
      {/*<Footer />*/}
    </BrowserRouter>
  );
};

export default Router;
