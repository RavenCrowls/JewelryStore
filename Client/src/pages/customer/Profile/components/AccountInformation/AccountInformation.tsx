import { EnvironmentOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

type AccountInformationProps = {
  name: string;
  email: string;
  address?: string;
};

const AccountInformation: React.FC<AccountInformationProps> = ({ name, email, address = "" }) => {
  return (
    <div className="text-[20px]">
      <h4 className="py-[7px]">
        Tên người dùng: <span className="font-bold">{name}</span>
      </h4>
      <p className="py-[7px]">Email: {email}</p>
      {address && <p className="py-[7px]">Địa chỉ: {address}</p>}
      {address == "" && (
        <div className="py-[7px] flex items-center">
          <p>Địa chỉ: Chưa có</p>
          <Button className="p-1.5 px-2 h-[36px] ml-3 bg-blue rounded-none flex text-[18px]">
            <EnvironmentOutlined />
            Thêm Địa Chỉ
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountInformation;
