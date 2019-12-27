import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Auth from './auth/auth';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import RestoreForm from './restore/restore';

export const routes = {
  home: '/',
  auth: '/auth',
  login: '/auth/login',
  register: '/auth/register',
  restore: '/restore',
  savedProducts: '/products/saved',
  account: '/account',
  editAccount: '/account/edit',
};

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route
          exact
          path={routes.home}
          component={() => <div>Home</div>}
        />
        <Route path={routes.auth} component={Auth} />
        <Route path={routes.restore} component={RestoreForm} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
