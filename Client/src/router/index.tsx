// src/router/index.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import ManagerLayout from "../layouts/ManagerLayout";
import Dashboard from "../pages/manager/(Dashboard)/Dashboard";
import Product from "../pages/manager/(Product)/Product";
import Report from "../pages/manager/(Dashboard)/Report";
import Revenue from "../pages/manager/(Dashboard)/Revenue/Revenue";
import Cost from "../pages/manager/(Dashboard)/Cost/Cost";
import LoginPage from "../pages/LoginPage";
import Employee from "../pages/manager/(Employee)/Employee/Employee";
import Customer from "../pages/manager/(Customer)/Customer/Customer";
import Import from "../pages/manager/(Import)/Import/Import";
import Liquidation from "../pages/manager/(Liquidation)/Liquidation/Liquidation";

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

        {/* /manager/employee */}
        <Route path="employee" element={<Employee />} />

        {/* /manager/customer*/}
        <Route path="customer" element={<Customer />} />

        {/* /manager/import*/}
        <Route path="import" element={<Import />} />

        {/* /manager/liquidation*/}
        <Route path="liquidation" element={<Liquidation />} />

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
