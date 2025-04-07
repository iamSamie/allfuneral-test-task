import { Route, Routes } from 'react-router-dom';

import { Sidebar } from '@/modules/sidebar';
import { Company } from '@/modules/company';


export const App = () => (
  <main id="main">
    <Sidebar />
    <Routes>
      <Route path="/company" element={<Company />} />
    </Routes>
  </main>
);