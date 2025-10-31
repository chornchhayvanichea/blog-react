import React from "react";
import { Row, Col } from "antd";
import CategoryPage from "./CategoryPage";
import PostList from "../components/posts/PostList";

export default function HomePage() {
  return (
    <div
      style={{
        padding: "40px 20px",
        background: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Row gutter={24}>
          <Col xs={24} lg={16}>
            <PostList />
          </Col>
          <Col xs={24} lg={8}>
            <CategoryPage />
          </Col>
        </Row>
      </div>
    </div>
  );
}
