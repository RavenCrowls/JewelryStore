import { Outlet } from "react-router-dom";
import { BellOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Avatar, Badge, Input } from "antd";
import { Link } from "react-router-dom";

const { Search } = Input;

export default function CustomerLayout() {
  return (
    <Layout>
      <header className="bg-[#333333] text-white">
        <div className="flex relative my-4 mx-12 items-center">
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
          </Link>

          <div className="flex items-center absolute top-0 right-0 h-full gap-6">
            <button className="mr-2">
              <Badge count={5} size="small">
                <BellOutlined className="text-xl text-white" />
              </Badge>
            </button>
            <div className="flex items-center gap-2">
              <Avatar className="border border-solid border-white" src="/src/assets/avatar.jpg" />
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
