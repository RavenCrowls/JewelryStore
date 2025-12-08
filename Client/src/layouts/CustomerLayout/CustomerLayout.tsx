// layouts/CustomerLayout/CustomerLayout.tsx
import { Outlet } from "react-router-dom";
import { BellOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Avatar, Badge, Input } from "antd";
import { Link } from "react-router-dom";

const { Search } = Input;

export default function CustomerLayout() {
  return (
    <Layout>
      <header className="bg-white">
        <div className="flex relative my-3 mx-12 items-center">
          <div className="absolute top-50% left-0">
            <Search
              placeholder="Search Product Here"
              allowClear
              style={{ width: 300 }}
              size="large"
            />
          </div>

          <Link
            className="flex items-center m-auto"
            to={{
              pathname: "/"
            }}
          >
            <img src="/src/assets/logo.svg" />
            <span>Luxora</span>
          </Link>

          <div className="flex items-center absolute top-0 right-0 h-full gap-6">
            <button className="mr-2">
              <Badge count={5} size="small">
                <BellOutlined className="text-xl" />
              </Badge>
            </button>
            <div className="flex items-center gap-2">
              <Avatar icon={<UserOutlined />} />
              <span>em2@123</span>
            </div>
            <LogoutOutlined />
          </div>
        </div>
      </header>

      <Outlet />

      <div>FOOTER</div>
    </Layout>
  );
}
