import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'app/pages/Home';
import Repository from 'app/pages/Repository';

const AppRoutes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/:source/:repo" component={Repository} />
  </Switch>
);

export default AppRoutes;