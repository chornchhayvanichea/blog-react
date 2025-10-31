import React from "react";
import { Space, Card, Row, Col, Typography } from "antd";
import PostCard from "../components/posts/PostCard";
import { BookOutlined } from "@ant-design/icons";
const BookmarksPage = () => {
  const { Title, Text } = Typography;
  const samplePosts = [
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
      id: 3,
      title: "Designing for Accessibility",
      excerpt:
        "Accessibility isn't an afterthought—it's a fundamental part of creating inclusive digital experiences. Here's how to build products that everyone can use.",
      author: "Emma Williams",
      authorAvatar: "https://i.pravatar.cc/150?img=5",
      publishDate: "Oct 15, 2025",
      readTime: "6 min",
      tags: ["UX Design", "Accessibility"],
      coverImage:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop",
      likes: 198,
      comments: 31,
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
                  <Title style={{ margin: 0 }}>Bookmarks List</Title>
                </Space>
                <Text style={{ color: "gray" }}>
                  This page shows all the posts you've saved for later.
                </Text>
              </Space>
              {/*
                   *
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                   * **/}

              <Card
                style={{
                  borderRadius: 0,
                  border: "1px solid #e8e8e8",
                }}
                bodyStyle={{ padding: "24px" }}
              >
                {samplePosts.map((post, index) => (
                  <PostCard
                    key={post.id}
                    {...post}
                    isLast={index === samplePosts.length - 1}
                    onClick={() => console.log("Clicked post:", post.id)}
                    onLike={(liked) => console.log("Liked:", liked)}
                    onComment={() => console.log("Comment clicked")}
                  />
                ))}
              </Card>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BookmarksPage;
