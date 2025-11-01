import React, { useEffect, useState } from "react";
import { Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import PostForm from "../../components/posts/PostForm";
import { usePosts } from "../../contexts/PostContext";
import { actionService } from "../../services/actionsService";
import { ROUTES } from "../../constants/routes";

export default function CreatePostPage() {
  const { createPost, loading } = usePosts();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await actionService.getCategories();
        setCategories(response.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        message.error("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const handlePublish = async (postData) => {
    try {
      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("content", postData.content);
      formData.append("category_id", postData.category_id);
      formData.append("status", "published");

      if (postData.fileList && postData.fileList.length > 0) {
        formData.append("image", postData.fileList[0]);
      }

      await createPost(formData);
      message.success("Post published successfully!");
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error("Failed to publish post:", error);
      message.error(error.response?.data?.message || "Failed to publish post");
    }
  };

  const handleSaveDraft = async (postData) => {
    try {
      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("content", postData.content);
      formData.append("category_id", postData.category_id);
      formData.append("status", "draft");

      if (postData.fileList && postData.fileList.length > 0) {
        formData.append("image", postData.fileList[0]);
      }

      await createPost(formData);
      message.success("Draft saved!");
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error("Failed to save draft:", error);
      message.error(error.response?.data?.message || "Failed to save draft");
    }
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

        <PostForm
          onPublish={handlePublish}
          onSaveDraft={handleSaveDraft}
          loading={loading}
          categories={categories}
          loadingCategories={loadingCategories}
        />
      </div>
    </div>
  );
}
