import { Sidebar } from '@/modules/sidebar';
import { Company } from '@/modules/company';
import { Route, Routes } from 'react-router-dom';

export const App = () => (
  <main id="main">
    <Sidebar />
    <Routes>
      <Route path="/company" element={<Company />} />
    </Routes>
  </main>
);