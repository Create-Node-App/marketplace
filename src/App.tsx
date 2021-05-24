import React, { FC, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

import 'app/theme';

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
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <GlobalStyles />
      <MomentLocale />
      <AppRoutes />
    </BrowserRouter>
  </Suspense>
);

export default App;
