import React from "react";
import { Typography, Row, Col } from "antd";
import PostList from "../components/posts/PostList";
import CategoryPage from "./CategoryPage";
const { Title, Text } = Typography;

const HomePage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "32px 20px",
        margin: "0 auto",
        maxWidth: "1000px",
      }}
    >
      <Row justify="center" gutter={[40, 32]}>
        {/* Main Content - Left Side */}
        <Col xs={24} sm={24} md={24} lg={14} xl={14}>
          <div style={{ maxWidth: "680px" }}>
            {/* Header */}
            <div
              style={{ textAlign: "center", paddingTop: 20, marginBottom: 40 }}
            >
              <Title
                level={1}
                style={{
                  fontWeight: 700,
                  fontSize: 36,
                  marginBottom: 12,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Explore & Discover
              </Title>
              <Text style={{ fontSize: 15, color: "#666" }}>
                Curated stories and insights from creators
              </Text>
            </div>

            {/* Posts List */}
            <PostList />
          </div>
        </Col>

        {/* Category Section - Right Side */}
        <Col xs={0} sm={0} md={0} lg={8} xl={7}>
          <div style={{ position: "sticky", top: 80 }}>
            <CategoryPage />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
