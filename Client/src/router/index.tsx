// src/router/index.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import ManagerLayout from "../layouts/ManagerLayout";
import Profile from "../pages/manager/(Profile)/Profile";
import Dashboard from "../pages/manager/(Dashboard)/Dashboard";
import Product from "../pages/manager/(Product)/Product";
import Report from "../pages/manager/(Dashboard)/Report";
import Revenue from "../pages/manager/(Dashboard)/Revenue/Revenue";
import Cost from "../pages/manager/(Dashboard)/Cost/Cost";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import Employee from "../pages/manager/(Employee)/Employee/Employee";
import Customer from "../pages/manager/(Customer)/Customer/Customer";
import CustomerDetail from "../pages/manager/(Customer)/CustomerDetail/CustomerDetail";
import Bill from "../pages/manager/(Customer)/Bill/Bill";
import Import from "../pages/manager/(Import)/Import/Import";
import ImportDetail from "../pages/manager/(Import)/ImportDetail/ImportDetail";
import Liquidation from "../pages/manager/(Liquidation)/Liquidation/Liquidation";
import LiquidationDetail from "../pages/manager/(Liquidation)/LiquidationDetail/LiquidationDetail";
import RequireAuth from "./RequireAuth";
import RedirectIfAuthed from "./RedirectIfAuthed";
import CustomerLayout from "../layouts/CustomerLayout";
import Home from "../pages/customer/Home";
import ProductDetail from "../pages/customer/ProductDetail";

const AppRouter = () => {
  return (
    <Routes>
      {/* "/" -> prefer /manager if authed, else /login */}
      <Route path="/" element={<Navigate to="/manager" replace />} />

      <Route
        path="/login"
        element={
          <RedirectIfAuthed>
            <LoginPage />
          </RedirectIfAuthed>
        }
      />
      <Route
        path="/signup"
        element={
          <RedirectIfAuthed>
            <SignupPage />
          </RedirectIfAuthed>
        }
      />

      {/* Public customer page */}
      <Route path="/" element={<CustomerLayout />}>
        {/* / */}
        <Route index element={<Home />} />

        {/* /product-detail */}
        <Route path="/product-detail" element={<ProductDetail />} />
      </Route>

      {/* Protected manager area */}
      <Route
        path="/manager"
        element={
          <RequireAuth>
            <ManagerLayout />
          </RequireAuth>
        }
      >
        {/* /manager */}
        <Route index element={<Dashboard />} />

        {/* /manager/dashboard */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* /manager/profile */}
        <Route path="profile" element={<Profile />} />

        {/* /manager/product */}
        <Route path="product" element={<Product />} />

        {/* /manager/employee */}
        <Route path="employee" element={<Employee />} />

        {/* /manager/customer*/}
        <Route path="customer" element={<Customer />} />
        {/* /manager/detail*/}
        <Route path="customer/:name" element={<CustomerDetail />} />
        {/* /manager/detail*/}
        <Route path="customer/:name/:id" element={<Bill />} />

        {/* /manager/import*/}
        <Route path="import" element={<Import />} />
        {/* /manager/detail*/}
        <Route path="import/:lot" element={<ImportDetail />} />

        {/* /manager/liquidation*/}
        <Route path="liquidation" element={<Liquidation />} />

        <Route path="liquidation/:id" element={<LiquidationDetail />} />
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
