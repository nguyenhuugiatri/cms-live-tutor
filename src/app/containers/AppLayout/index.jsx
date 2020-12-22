import React, { memo } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Dashboard from 'app/containers/Dashboard';
import LoginPage from 'app/containers/LoginPage';
export const AppLayout = props => (
  <Switch>
    <Route exact path="/dashboard">
      <Dashboard />
    </Route>
    <Route path="/login">
      <LoginPage />
    </Route>
    <Redirect to="/login" />
  </Switch>
);

export default memo(AppLayout);
