import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { collapseMenu } from "../../store/reducers/tab";
import "./index.css";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;

const CommonHeader = ({ collapsed }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = [
    {
      key: "1",
      label: <span>个人中心</span>,
    },
    {
      key: "2",
      label: <span onClick={() => logout()}>退出</span>,
    },
  ];
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Header className="header-container">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => dispatch(collapseMenu())}
        style={{
          fontSize: "16px",
          width: 64,
          height: 32,
          backgroundColor: "#fff",
        }}
      />
      <Dropdown menu={{ items }}>
        <Avatar
          src={
            <img
              sizes={36}
              alt="头像"
              src={require("../../assets/images/user.png")}
            />
          }
        />
      </Dropdown>
    </Header>
  );
};

export default CommonHeader;
