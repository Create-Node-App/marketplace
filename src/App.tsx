import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'app/theme';

import Loading from 'app/components/Loading';
import MomentLocale from 'app/components/MomentLocale';
import AppRoutes from 'app/routes/AppRoutes';

import 'app/i18n';

const App = () => (
  <Suspense fallback={<Loading />}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <MomentLocale />
      <AppRoutes />
    </BrowserRouter>
  </Suspense>
);

export default App;
