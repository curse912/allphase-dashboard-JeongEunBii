import './App.css'

import { Route, Routes, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import DashboardPage from './pages/Dashboard/DashboardPage'
import PaymentsPage from './pages/Payments/PaymentsPage';
import MerchantsPage from './pages/Merchants/MerchantsPage';

function App() {

  return (
    <>
      <AppLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/merchants" element={<MerchantsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </>
  )
}

export default App
