import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'pages/Home';
import Repository from 'pages/Repository';

const AppRoutes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/:source/:repo/:branch?/:subdir?" component={Repository} />
  </Switch>
);

export default AppRoutes;
