import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;

export default function AppFooter() {
  return (
    <Footer
      style={{
        textAlign: "center",
        // backgroundColor: "#e6e9ed",
        color: "#fff",
        height: "60px",
        lineHeight: "60px",
        padding: "0 20px",
      }}
    >
      <p className="text-gray-500">
        TechBlog ©{new Date().getFullYear()} Sharing Knowledge, Building the
        future.
      </p>
    </Footer>
  );
}
