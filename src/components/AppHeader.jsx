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
import {
  SearchOutlined,
  MenuOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ROUTES } from "../constants/routes";
import { useAuth } from "../contexts/AuthContext";
import { imgService } from "../services/imgService";
const { Header } = Layout;
const { useBreakpoint } = Grid;
const { useToken } = theme;

const AppHeader = ({ darkMode }) => {
  const screens = useBreakpoint();
  const { token } = useToken();
  const { user, logout } = useAuth();
  console.log("User object:", user);
  console.log("Avatar path:", user?.profile?.avatar);

  const avatarUrl = user?.profile?.avatar;

  console.log("Full avatar URL:", avatarUrl);
  // AntD v5 Dropdown menu items
  const menuItems = [
    {
      key: "1",
      label: <Link to={ROUTES.CREATE_POST}>Write a blog</Link>,
    },
    {
      key: "2",
      label: <Link to={ROUTES.PROFILE}>Profile</Link>,
    },
    {
      key: "3",
      label: (
        <span
          onClick={() => {
            logout();
          }}
          style={{ cursor: "pointer" }}
        >
          Logout
        </span>
      ),
    },
  ];

  // Mobile menu items (when hamburger is shown)
  const mobileMenuItems = [
    {
      key: "search",
      label: "Search",
    },
    ...menuItems,
  ];

  return (
    <Header
      style={{
        border: "1px solid #f0f1f5",
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
        <Dropdown menu={{ items: mobileMenuItems }} trigger={["click"]}>
          <Button icon={<MenuOutlined />} />
        </Dropdown>
      )}

      <Space size="middle">
        {screens.sm && (
          <Link to={ROUTES.CREATE_POST}>
            <Button type="default" icon={<EditOutlined />} />
          </Link>
        )}

        <Dropdown
          menu={{ items: menuItems }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Avatar
            icon={<UserOutlined />}
            size="large"
            src={avatarUrl}
            alt="Avatar"
            style={{ cursor: "pointer" }}
          />
        </Dropdown>
      </Space>
    </Header>
  );
};

export default AppHeader;
