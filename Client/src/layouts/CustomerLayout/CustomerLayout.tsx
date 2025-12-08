import { LogoutOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Badge, Input, Layout } from "antd";
import { Link, Outlet } from "react-router-dom";

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
            <button className="mr-2 relative top-0.5">
              <Badge count={5} size="small">
                <ShoppingCartOutlined className="text-2xl text-white" />
              </Badge>
            </button>
            <div className="flex items-center gap-2">
              <Avatar className="border border-solid border-white" src="/src/assets/avatar.jpg" />
              <span>em2@123</span>
            </div>
            <LogoutOutlined className="text-xl" />
          </div>
        </div>
      </header>

      <Outlet />

      <div>FOOTER</div>
    </Layout>
  );
}
