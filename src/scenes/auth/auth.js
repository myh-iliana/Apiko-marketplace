import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../login/login';
import Register from '../register/register';
import { routes } from '../routes';

const Auth = () => {
  return (
    <div>
      <Switch>
        <Route path={routes.login} component={Login} />
        <Route path={routes.register} component={Register} />
      </Switch>
    </div>
  );
};

export default Auth;
