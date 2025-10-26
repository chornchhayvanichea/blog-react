import React, { useState } from "react";
import { Typography, Space, Row, Col, Empty, Segmented } from "antd";
import {
  BookTwoTone,
  FileTextOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import PostCard from "../components/posts/PostCard";

const { Title, Text } = Typography;

const BookmarksPage = () => {
  const [activeTab, setActiveTab] = useState("published");

  const publishedPosts = [
    {
      id: 2,
      title: "Understanding React Hooks: A Deep Dive",
      excerpt:
        "React Hooks revolutionized the way we write React components. Let's explore how useState, useEffect, and custom hooks can simplify your code and make it more reusable.",
      author: "Michael Chen",
      authorAvatar: "https://i.pravatar.cc/150?img=12",
      publishDate: "Oct 18, 2025",
      readTime: "12 min",
      tags: ["React", "JavaScript"],
      coverImage:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
      likes: 287,
      comments: 45,
    },
    {
      id: 4,
      title: "The Rise of AI in Software Development",
      excerpt:
        "AI tools are transforming how we write code, but what does this mean for developers? We examine the opportunities and challenges in this new era of AI-assisted programming.",
      author: "David Martinez",
      authorAvatar: "https://i.pravatar.cc/150?img=8",
      publishDate: "Oct 12, 2025",
      readTime: "10 min",
      tags: ["AI", "Future of Tech"],
      likes: 421,
      comments: 67,
    },
    {
      id: 5,
      title: "Mastering CSS Grid",
      excerpt:
        "CSS Grid has changed the game for web layouts. Discover how to create responsive, flexible designs without the headaches of traditional CSS.",
      author: "Lisa Anderson",
      authorAvatar: "https://i.pravatar.cc/150?img=9",
      publishDate: "Oct 10, 2025",
      readTime: "7 min",
      tags: ["CSS", "Web Design"],
      coverImage:
        "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&h=300&fit=crop",
      likes: 312,
      comments: 28,
    },
  ];

  const draftPosts = [
    {
      id: 6,
      title: "Introduction to TypeScript for Beginners",
      excerpt:
        "TypeScript adds type safety to JavaScript, making your code more robust and maintainable. This guide will help you get started with the basics.",
      author: "You",
      authorAvatar: "https://i.pravatar.cc/150?img=15",
      publishDate: "Draft",
      readTime: "5 min",
      tags: ["TypeScript", "Tutorial"],
      coverImage:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop",
      likes: 0,
      comments: 0,
    },
    {
      id: 7,
      title: "Building a REST API with Node.js",
      excerpt:
        "Learn how to create a scalable REST API using Node.js and Express. We'll cover routing, middleware, and best practices for API design.",
      author: "You",
      authorAvatar: "https://i.pravatar.cc/150?img=15",
      publishDate: "Draft",
      readTime: "15 min",
      tags: ["Node.js", "Backend"],
      likes: 0,
      comments: 0,
    },
  ];

  const currentPosts = activeTab === "published" ? publishedPosts : draftPosts;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "32px 20px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <Row justify="center">
        <Col xs={24} sm={24} md={22} lg={20} xl={18} xxl={16}>
          <Space direction="vertical" size={32} style={{ width: "100%" }}>
            {/* Header */}
            <div style={{ paddingTop: 20 }}>
              <Space align="center" size={12} style={{ marginBottom: 8 }}>
                <BookTwoTone
                  style={{
                    fontSize: 36,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                />
                <Title
                  level={1}
                  style={{
                    fontWeight: 700,
                    fontSize: 36,
                    margin: 0,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  My Bookmarks
                </Title>
              </Space>
              <Row>
                <Text style={{ fontSize: 15, color: "#666" }}>
                  Your saved articles and stories
                </Text>
              </Row>
            </div>

            {/* Sub Navigation */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Segmented
                value={activeTab}
                onChange={setActiveTab}
                size="large"
                options={[
                  {
                    label: (
                      <Space>
                        <CheckCircleOutlined />
                        <span>Published</span>
                      </Space>
                    ),
                    value: "published",
                  },
                  {
                    label: (
                      <Space>
                        <FileTextOutlined />
                        <span>Drafts</span>
                      </Space>
                    ),
                    value: "draft",
                  },
                ]}
                style={{
                  //   background: "#f5f5f5",
                  padding: 4,
                  borderRadius: 8,
                }}
              />
            </div>

            {/* Posts List */}
            <div>
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    {...post}
                    onClick={() => console.log("Clicked post:", post.id)}
                  />
                ))
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <Space direction="vertical" size={8}>
                      <Text style={{ fontSize: 16, color: "#999" }}>
                        No {activeTab} posts yet
                      </Text>
                      <Text type="secondary" style={{ fontSize: 14 }}>
                        {activeTab === "published"
                          ? "Start saving articles you want to read later"
                          : "Create your first draft"}
                      </Text>
                    </Space>
                  }
                  style={{ marginTop: 60 }}
                />
              )}
            </div>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default BookmarksPage;
