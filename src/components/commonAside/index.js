import * as Icon from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import MenuConfig from "../../config";
const { Sider } = Layout;
const CommonAside = ({ collapsed, getTag }) => {
  const navigate = useNavigate();
  const selectMenu = (item) => {
    navigate(item.key);
    getTag(item);
    MenuConfig.forEach((menu) => {
      if (menu.path === item.keyPath[item.keyPath.length - 1]) {
      }
    });
  };
  const IconElement = (name) => React.createElement(Icon[name]);
  const items = MenuConfig.map((item) => {
    const child = {
      key: item.path,
      icon: IconElement(item.icon),
      label: item.label,
    };
    if (item.children) {
      child.children = item.children.map((i) => {
        return {
          key: i.path,
          label: i.label,
        };
      });
    }
    return child;
  });
  return (
    <Sider trigger={null} collapsed={collapsed}>
      <h3 className="app-name">{collapsed ? "后台" : "通用后台管理系统"}</h3>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%" }}
        items={items}
        onClick={(item) => selectMenu(item)}
      />
    </Sider>
  );
};

export default CommonAside;
