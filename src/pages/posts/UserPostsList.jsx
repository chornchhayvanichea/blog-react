import React, { useState } from "react";
import { Space, Row, Col, Typography, Divider, Segmented } from "antd";
import {
  BookOutlined,
  EditOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import PostCard from "../../components/posts/PostCard";

const UserPostsList = () => {
  const { Title, Text } = Typography;
  const [postStatus, setPostStatus] = useState("published");

  const allPosts = [
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
      status: "published",
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
      status: "published",
    },
    {
      id: 9,
      title: "Building a Scalable Backend Architecture",
      excerpt:
        "Learn the fundamentals of designing backend systems that can handle millions of users while maintaining performance and reliability.",
      author: "Sarah Johnson",
      authorAvatar: "https://i.pravatar.cc/150?img=1",
      publishDate: "Draft",
      readTime: "15 min",
      tags: ["Backend", "Architecture"],
      coverImage:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
      likes: 0,
      comments: 0,
      status: "draft",
    },
  ];

  const currentPosts = allPosts.filter((post) => post.status === postStatus);

  return (
    <div
      style={{
        padding: "40px 20px",
        background: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Row gutter={24} justify="center">
          <Col xs={24} lg={24}>
            <Space direction="vertical" size={24} style={{ width: "100%" }}>
              <Space direction="vertical" size={8} style={{ width: "100%" }}>
                <Space align="center" size={8}>
                  <BookOutlined style={{ fontSize: 40, color: "#9e9e9e" }} />
                  <Title style={{ margin: 0 }}>My Posts</Title>
                </Space>
                <Text style={{ color: "gray" }}>
                  Manage your published posts and drafts.
                </Text>
              </Space>

              <Divider />

              {/* Draft/Published Toggle */}
              <div style={{ display: "flex" }}>
                <Segmented
                  value={postStatus}
                  onChange={setPostStatus}
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
                          <EditOutlined />
                          <span>Draft</span>
                        </Space>
                      ),
                      value: "draft",
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
                {currentPosts.map((post, index) => (
                  <PostCard
                    key={post.id}
                    {...post}
                    isLast={index === currentPosts.length - 1}
                    onClick={() => console.log("Clicked post:", post.id)}
                    onLike={(liked) => console.log("Liked:", liked)}
                    onComment={() => console.log("Comment clicked")}
                  />
                ))}
              </div>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UserPostsList;
