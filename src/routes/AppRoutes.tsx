import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from 'pages/Home';
import Repository from 'pages/Repository';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/:source/:repo/:branch/:subdir" element={<Repository />} />
  </Routes>
);

export default AppRoutes;
