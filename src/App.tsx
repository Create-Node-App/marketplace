import React, { FC, Suspense } from 'react';
import { HashRouter } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

import 'theme';

import Loading from 'components/Loading';
import MomentLocale from 'components/MomentLocale';
import GlobalStyles from 'components/GlobalStyles';
import AppRoutes from 'routes/AppRoutes';

const App: FC = () => (
  <Suspense
    fallback={
      <Loading>
        <FaSpinner />
      </Loading>
    }
  >
    <HashRouter basename={process.env.PUBLIC_URL}>
      <GlobalStyles />
      <MomentLocale />
      <AppRoutes />
    </HashRouter>
  </Suspense>
);

export default App;
