import React, { useState } from "react";
import {
  Typography,
  Space,
  Row,
  Col,
  Avatar,
  Button,
  Segmented,
  Divider,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  SettingOutlined,
  FileTextOutlined,
  HeartOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import PostCard from "../components/posts/PostCard";

const { Title, Text, Paragraph } = Typography;

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const userInfo = {
    name: "Sarah Johnson",
    username: "@sarahjohnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    bio: "Software engineer passionate about clean code and web development. Writing about React, JavaScript, and best practices.",
    followers: 1234,
    following: 567,
    totalPosts: 42,
    totalLikes: 8945,
    totalViews: 45678,
  };

  const userPosts = [
    {
      id: 1,
      title: "The Art of Writing Clean Code: A Developer's Journey",
      excerpt:
        "Writing clean code is not just about making it work—it's about crafting something that other developers can read, understand, and maintain. In this article, we explore the principles that separate good code from great code.",
      author: "Sarah Johnson",
      authorAvatar: "https://i.pravatar.cc/150?img=1",
      publishDate: "Oct 20, 2025",
      readTime: "8 min",
      tags: ["Programming", "Best Practices"],
      coverImage:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      likes: 142,
      comments: 23,
    },
    {
      id: 8,
      title: "10 JavaScript Tips Every Developer Should Know",
      excerpt:
        "From array methods to async/await patterns, these JavaScript tips will level up your coding game and make you more productive.",
      author: "Sarah Johnson",
      authorAvatar: "https://i.pravatar.cc/150?img=1",
      publishDate: "Oct 15, 2025",
      readTime: "6 min",
      tags: ["JavaScript", "Tips"],
      coverImage:
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop",
      likes: 256,
      comments: 34,
    },
  ];

  const likedPosts = [
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
  ];

  const currentPosts = activeTab === "posts" ? userPosts : likedPosts;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "32px 20px",
        maxWidth: "2000px",
        margin: "0 auto",
      }}
    >
      <Row justify="center">
        <Col xs={24} sm={24} md={22} lg={20} xl={20}>
          <Space direction="vertical" size={48} style={{ width: "100%" }}>
            {/* Profile Header */}
            <div style={{ paddingTop: 20 }}>
              <Row gutter={[32, 32]} align="middle">
                <Col xs={24} sm={24} md={8} style={{ textAlign: "center" }}>
                  <Avatar
                    size={140}
                    src={userInfo.avatar}
                    icon={<UserOutlined />}
                    style={{ border: "4px solid #f0f0f0" }}
                  />
                </Col>

                <Col xs={24} sm={24} md={16}>
                  <Space
                    direction="vertical"
                    size={16}
                    style={{ width: "100%" }}
                  >
                    <div>
                      <Title level={1} style={{ margin: 0, fontSize: 32 }}>
                        {userInfo.name}
                      </Title>
                      <Text type="secondary" style={{ fontSize: 15 }}>
                        {userInfo.username}
                      </Text>
                    </div>

                    <Paragraph
                      style={{
                        margin: 0,
                        fontSize: 15,
                        color: "#666",
                        lineHeight: 1.6,
                      }}
                    >
                      {userInfo.bio}
                    </Paragraph>

                    <Space size={12} wrap>
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="large"
                        style={{
                          borderRadius: 8,
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          border: "none",
                        }}
                      >
                        Edit Profile
                      </Button>
                    </Space>
                  </Space>
                </Col>
              </Row>

              {/* Stats */}

              <Row
                gutter={[24, 24]}
                style={{
                  marginTop: 40,
                  paddingTop: 32,
                  borderTop: "1px solid #f0f0f0",
                  textAlign: "center",
                }}
                justify="space-around"
              >
                <Col xs={24} sm={8} md={8}>
                  <Space
                    direction="vertical"
                    size={4}
                    style={{ width: "100%" }}
                  >
                    <Text strong style={{ fontSize: 24 }}>
                      {userInfo.totalPosts}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 13 }}>
                      Posts
                    </Text>
                  </Space>
                </Col>

                <Col xs={24} sm={8} md={8}>
                  <Space
                    direction="vertical"
                    size={4}
                    style={{ width: "100%" }}
                  >
                    <Text strong style={{ fontSize: 24, color: "#ff4d4f" }}>
                      {userInfo.totalLikes}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 13 }}>
                      Total Likes
                    </Text>
                  </Space>
                </Col>

                <Col xs={24} sm={8} md={8}>
                  <Space
                    direction="vertical"
                    size={4}
                    style={{ width: "100%" }}
                  >
                    <Text strong style={{ fontSize: 24, color: "#1890ff" }}>
                      {userInfo.totalViews}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 13 }}>
                      Total Views
                    </Text>
                  </Space>
                </Col>
              </Row>
            </div>

            <Divider />

            {/* Sub Navigation */}
            <div style={{ display: "flex" }}>
              <Segmented
                value={activeTab}
                onChange={setActiveTab}
                size="large"
                options={[
                  {
                    label: (
                      <Space>
                        <FileTextOutlined />
                        <span>My Posts</span>
                      </Space>
                    ),
                    value: "posts",
                  },
                  {
                    label: (
                      <Space>
                        <HeartOutlined />
                        <span>Liked</span>
                      </Space>
                    ),
                    value: "liked",
                  },
                ]}
                style={{
                  padding: 4,
                  borderRadius: 8,
                }}
              />
            </div>

            {/* Posts List */}
            <div>
              {currentPosts.map((post) => (
                <PostCard
                  key={post.id}
                  {...post}
                  onClick={() => console.log("Clicked post:", post.id)}
                />
              ))}
            </div>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
