import React, { useState } from "react";
import { Link, Links, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  BookOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ToolOutlined,
  FlagOutlined,
  LineChartOutlined,
  ReadOutlined,
  RadarChartOutlined,
  ManOutlined,
  TeamOutlined,
  ProfileOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Typography } from "antd";
import { ROUTES } from "../constants/routes";
import { useAuth } from "../contexts/AuthContext";

const { Sider } = Layout;
const { Title } = Typography;
const Sidebar = ({ darkMode }) => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
  const location = useLocation();
  const { user } = useAuth();

  //  console.log("=== SIDEBAR DEBUG ===");
  //  console.log("Full user object:", user);
  //  console.log("user.role:", user?.role);
  //  console.log("user.user:", user?.user);
  // console.log("user.user?.role:", user?.user?.role);
  //  console.log("Is admin?", user?.role === "admin");
  //  console.log("====================");
  const items = [
    {
      key: ROUTES.HOME,
      icon: <HomeOutlined />,
      label: <Link to={ROUTES.HOME}>Home</Link>,
    },
    {
      key: ROUTES.BOOKMARK,
      icon: <BookOutlined />,
      label: <Link to={ROUTES.BOOKMARK}>Bookmarks</Link>,
    },
    {
      key: ROUTES.PROFILE,
      icon: <UserOutlined />,
      label: <Link to={ROUTES.PROFILE}>Profile</Link>,
    },
    {
      key: ROUTES.CURRENT_USER_POSTS,
      icon: <ReadOutlined />,
      label: <Link to={ROUTES.CURRENT_USER_POSTS}>My Posts</Link>,
    },
    {
      type: "divider",
    },
    {
      key: ROUTES.SETTINGS,
      icon: <SettingOutlined />,
      label: <Link to={ROUTES.SETTINGS}>Settings</Link>,
    },
    {
      key: ROUTES.ADMIN_DASHBORD,
      icon: <ToolOutlined />,
      label: "Admin Panel",
      children: [
        {
          key: ROUTES.ADMIN_DASHBORD,
          icon: <LineChartOutlined />,
          label: <Link to={ROUTES.ADMIN_DASHBORD}>Dashboard</Link>,
        },
        {
          key: ROUTES.ADMIN_USERS,
          icon: <TeamOutlined />,
          label: <Link to={ROUTES.ADMIN_USERS}>Manage Users</Link>,
        },
        {
          key: ROUTES.ADMIN_REPORTS,
          icon: <FlagOutlined />,
          label: <Link to={ROUTES.ADMIN_REPORTS}>Reports List</Link>,
        },
      ],
    },
  ];

  //  if (user?.role === "admin") {
  //    items.push({
  //      key: "admin-panel",
  //      icon: <ToolOutlined />,
  //      label: "Admin Panel",
  //      children: [
  //        {
  //          key: ROUTES.ADMIN_DASHBORD,
  //          icon: <LineChartOutlined />,
  //          label: <Link to={ROUTES.ADMIN_DASHBORD}>Statistic</Link>,
  //        },
  //        {
  //          key: ROUTES.ADMIN_REPORTS,
  //          icon: <FlagOutlined />,
  //          label: <Link to={ROUTES.ADMIN_REPORTS}>Report List</Link>,
  //        },
  //      ],
  //    });
  //  }
  //
  return (
    <Sider
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "auto",
        border: "1px solid #f0f2f5",
      }}
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={200}
      collapsedWidth={50}
      breakpoint="md"
      onBreakpoint={(broken) => setCollapsed(broken)}
      theme={darkMode ? "dark" : "light"}
    >
      <div
        className={`flex items-center ${
          collapsed ? "justify-center" : "justify-between"
        } px-3 mt-4 mb-5`}
      >
        {!collapsed && (
          <Title level={3} style={{ marginLeft: 20, color: "#1890ff" }}>
            Blog
          </Title>
        )}
        {/*
 <img src="" alt="Logo" className="h-8 w-auto" />

        */}
        <Button
          type="text"
          onClick={() => setCollapsed(!collapsed)}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
      </div>
      <Menu
        inlineIndent={16}
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
        theme={darkMode ? "dark" : "light"}
      />
    </Sider>
  );
};

export default Sidebar;
