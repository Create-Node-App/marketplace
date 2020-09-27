import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'app/theme';

import Loading from 'app/components/Loading';
import MomentLocale from 'app/components/MomentLocale';
import GlobalStyles from 'app/components/GlobalStyles';
import AppRoutes from 'app/routes/AppRoutes';

import 'app/i18n';

/**
 * @todo: use PUBLIC_URL instead
 */

const App = () => (
  <Suspense fallback={<Loading />}>
    <BrowserRouter basename={process.env.NODE_ENV === 'development' ? undefined : '/marketplace'}>
      <GlobalStyles />
      <MomentLocale />
      <AppRoutes />
    </BrowserRouter>
  </Suspense>
);

export default App;
