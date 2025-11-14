import './App.css'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { ManagerLayout } from './layouts/ManagerLayout'
import { ManagerDashboard } from './pages/manager/Dashboard'
import { ManagerProduct } from './pages/manager/Product'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/manager" element={<ManagerLayout><Outlet /></ManagerLayout>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="product" element={<ManagerProduct />} />
        </Route>
        <Route path="/" element={<Navigate to="/manager/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/manager/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
