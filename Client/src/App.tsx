// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import ManagerLayout from "./layouts/ManagerLayout";
import Dashboard from "./pages/manager/Dashboard";
import Report from "./pages/manager/Report";
import Revenue from "./pages/manager/Revenue/Revenue";
import Cost from "./pages/manager/Cost/Cost";
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
        {/* /manager/report */}
        <Route path="report">
          <Route index element={<Report />} />
          <Route path="revenue" element={<Revenue />} />
          <Route path="cost" element={<Cost />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
}
