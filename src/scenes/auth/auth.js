import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';

import Login from '../login/login';
import Register from '../register/register';
import { routes } from '../routes';
import { useStore } from '../../stores/create-store';

const Auth = () => {
  const store = useStore();
  const { isLoggedIn } = store.auth;

  return (
    <div>
      <Switch>
        <Route
          path={routes.login}
          render={() =>
            isLoggedIn ? <Redirect to={routes.account} /> : <Login />
          }
        />
        <Route
          path={routes.register}
          render={() =>
            isLoggedIn ? (
              <Redirect to={routes.account} />
            ) : (
              <Register />
            )
          }
        />
      </Switch>
    </div>
  );
};

export default observer(Auth);
