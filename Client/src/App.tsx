// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import ManagerLayout from "./layouts/ManagerLayout";
import Dashboard from "./pages/manager/Dashboard";
import Report from "./pages/manager/Report";
export default function App() {
  return (
    <Routes>
      {/* "/" -> tự chuyển sang /manager */}
      <Route path="/" element={<Navigate to="/manager" replace />} />

      {/* layout manager */}
      <Route path="/manager" element={<ManagerLayout />}>
        {/* /manager -> Dashboard */}
        <Route index element={<Dashboard />} />

        {/* /manager/dashboard */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* /manager/products */}
        {/* <Route path="products" element={<Product />} /> */}
        <Route path="report" element={<Report />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
}
