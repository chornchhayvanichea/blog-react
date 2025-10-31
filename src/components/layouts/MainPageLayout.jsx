import React from "react";
import { Layout } from "antd";
import Sidebar from "../Sidebar";
import AppHeader from "../AppHeader";
import AppFooter from "../AppFooter";
import { Outlet } from "react-router-dom";
const { Footer, Content } = Layout;

const MainPageLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <Layout>
        <AppHeader />

        <Content
          style={{
            padding: "24px",
            minHeight: 360,
            color: "#ffffff",
          }}
        >
          {children}
          <Outlet />
        </Content>

        <AppFooter />
      </Layout>
    </Layout>
  );
};

export default MainPageLayout;
