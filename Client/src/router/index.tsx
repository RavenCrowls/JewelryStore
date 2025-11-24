// src/router/index.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import ManagerLayout from "../layouts/ManagerLayout";
import Dashboard from "../pages/manager/Dashboard";
// import Product from "../pages/manager/Product";
import Report from "../pages/manager/Report";

const AppRouter = () => {
  return (
    <Routes>
      {/* redirect "/" về /manager */}
      <Route path="/" element={<Navigate to="/manager" replace />} />

      {/* layout manager */}
      <Route path="/manager" element={<ManagerLayout />}>
        {/* /manager -> Dashboard */}
        <Route index element={<Dashboard />} />

        {/* /manager/dashboard */}
        <Route path="dashboard" element={<Dashboard />} />


        {/* /manager/products */}
        <Route path="report" element={<Report />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
};

export default AppRouter;
