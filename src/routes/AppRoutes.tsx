import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'app/pages/Home';

const AppRoutes = () => (
  <Switch>
    <Route path="/" component={Home} />
  </Switch>
);

export default AppRoutes;
