import { Col, Divider, Row } from "antd";
import Heading from "../components/Heading";
import { useState } from "react";
import "./Profile.css";
import AccountInformation from "./components/AccountInformation";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import { Link, Route, Routes } from "react-router-dom";

export default function Profile() {
  return (
    <div className="main-container">
      <Heading className="!mt-12 !mb-0" text="Tài khoản của bạn" />
      <div className="h-[4px] bg-black w-[80px] mx-auto rounded mt-6 mb-12" />
      <Row className="mb-32 mt-20">
        <Col span={6}>
          <h3 className="text-[28px] mb-[30px]">Tài khoản</h3>
          <ul
            style={{
              listStyleType: "circle",
              listStylePosition: "inside"
            }}
          >
            <li className="list-item">
              <Link to="/profile">Thông tin tài khoản</Link>
            </li>
            <li className="list-item">
              <Link to="/profile/change-password">Đổi mật khẩu</Link>
            </li>
            <li className="list-item">Đăng xuất</li>
          </ul>
        </Col>
        <Col span={18} className="text-[28px]">
          <h3>Thông tin tài khoản</h3>
          <Divider />
          <Routes>
            {/* /profile/change-password */}
            <Route
              path="/"
              element={
                <AccountInformation
                  name="Nguyễn Thành Đức"
                  email="nguyenthanhduc242004@gmail.com"
                />
              }
            />
            <Route path="/change-password" element={<ChangePassword />} />
          </Routes>
        </Col>
      </Row>
    </div>
  );
}
