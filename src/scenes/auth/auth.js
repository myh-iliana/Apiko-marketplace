import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from 'src/components/header/header';
import Login from '../login/login';
import Register from '../register/register';
import { routes } from '../routes';
import Restore from '../restore/restore';

const Auth = () => {
  return (
    <div>
      <Header light />

      <Switch>
        <Route path={routes.login} component={Login} />
        <Route path={routes.register} component={Register} />
        <Route path={routes.restore} component={Restore} />
      </Switch>
    </div>
  );
};

export default Auth;
