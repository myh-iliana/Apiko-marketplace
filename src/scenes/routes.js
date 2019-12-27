import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { observer } from 'mobx-react';

import Auth from './auth/auth';
import Footer from '../components/footer/footer';
import Home from './home/home';
import { useStore } from '../stores/create-store';

export const routes = {
  home: '/',
  auth: '/auth',
  login: '/auth/login',
  register: '/auth/register',
  restore: '/auth/restore',
  savedProducts: '/products/saved',
  account: '/account',
  editAccount: '/account/edit',
};

const Router = () => {
  const store = useStore();
  const { isLoggedIn } = store.auth;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <Route
          path={routes.auth}
          render={() =>
            isLoggedIn ? <Redirect to={routes.home} /> : <Auth />
          }
        />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default observer(Router);
