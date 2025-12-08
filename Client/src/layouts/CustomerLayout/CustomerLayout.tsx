// layouts/CustomerLayout/CustomerLayout.tsx
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "../../components/Customer/Header/Header";
import Footer from "../../components/Customer/Footer";

export default function CustomerLayout() {
  return (
    <Layout>
      <Header />

      <Outlet />

      <Footer />
    </Layout>
  );
}
