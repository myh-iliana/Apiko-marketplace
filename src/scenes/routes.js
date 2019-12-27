import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Auth from './auth/auth';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import RestoreForm from './restore/restore';
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
            isLoggedIn ? <Auth /> : <Redirect to={routes.home} />
          }
        />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
