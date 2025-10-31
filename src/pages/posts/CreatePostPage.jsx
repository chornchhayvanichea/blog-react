// src/pages/CreatePostPage.jsx
import React from "react";
import { Card, message } from "antd";
import { EyeOutlined, SaveOutlined } from "@ant-design/icons";
import PostForm from "../../components/posts/PostForm";
export default function CreatePostPage() {
  const handlePublish = (postData) => {
    message.success("Post published successfully!");
    console.log("Published Post:", postData);
  };

  const handleSaveDraft = (postData) => {
    message.success("Draft saved!");
    console.log("Draft Data:", postData);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <Card
          style={{
            marginBottom: 24,
            borderRadius: 8,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 600,
              color: "#1890ff",
            }}
          >
            Create New Post
          </h1>
        </Card>

        {/* Post Form */}
        <PostForm onPublish={handlePublish} onSaveDraft={handleSaveDraft} />
      </div>
    </div>
  );
}
