import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { Sidebar } from '@/modules/sidebar';

const Company = lazy(() => import('@/modules/company'));

export const App = () => (
  <main id="main">
    <Sidebar />
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/company" element={<Company />} />
      </Routes>
    </Suspense>
  </main>
);
