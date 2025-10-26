import React from "react";
import {
  Layout,
  Input,
  Button,
  Avatar,
  Space,
  Dropdown,
  Grid,
  theme,
} from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined, MenuOutlined, EditOutlined } from "@ant-design/icons";
import { ROUTES } from "../constants/routes";

const { Header } = Layout;
const { useBreakpoint } = Grid;
const { useToken } = theme;

const AppHeader = ({ darkMode }) => {
  const screens = useBreakpoint();
  const { token } = useToken();

  // AntD v5 Dropdown menu items
  const menuItems = [
    { key: "1", label: "Write a blog" },
    { key: "2", label: "Profile" },
    { key: "3", label: <Link to={ROUTES.LOGIN}>Logout</Link> },
  ];

  return (
    <Header
      style={{
        backgroundColor: token.colorBgContainer,
        padding: "0 16px",
        display: "flex",
        position: "sticky",
        top: 0,
        justifyContent: "space-between",
        alignItems: "center",
        height: 64,
        zIndex: 99,
      }}
    >
      {screens.sm ? (
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          style={{ maxWidth: 300 }}
        />
      ) : (
        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
          <Button icon={<MenuOutlined />} />
        </Dropdown>
      )}
      <Space size="middle">
        {screens.sm && <Button type="default" icon={<EditOutlined />} />}
        <Avatar size="large" src="/profile.jpg" style={{ cursor: "pointer" }} />
      </Space>
    </Header>
  );
};

export default AppHeader;
