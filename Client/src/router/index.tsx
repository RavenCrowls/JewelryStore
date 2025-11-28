// src/router/index.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import ManagerLayout from "../layouts/ManagerLayout";
import Dashboard from "../pages/manager/Dashboard";
import Product from "../pages/manager/Product";
import Report from "../pages/manager/Report";
import Revenue from "../pages/manager/Revenue/Revenue";
import Cost from "../pages/manager/Cost/Cost";
import LoginPage from "../pages/LoginPage";

const AppRouter = () => {
  return (
    <Routes>
      {/* "/" -> /manager */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />}/>
      <Route path="/manager" element={<ManagerLayout />}>
        {/* /manager */}
        <Route index element={<Dashboard />} />

        {/* /manager/dashboard */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* /manager/product */}
        <Route path="product" element={<Product />} />

        {/* /manager/report/... */}
        <Route path="report">
          {/* /manager/report */}
          <Route index element={<Report />} />
          {/* /manager/report/revenue */}
          <Route path="revenue" element={<Revenue />} />
          {/* /manager/report/cost */}
          <Route path="cost" element={<Cost />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
