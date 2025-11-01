import React, { useEffect, useState } from "react";
import { Card, message, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../../components/posts/PostForm";
import { usePosts } from "../../contexts/PostContext";
import { actionService } from "../../services/actionsService";
import { ROUTES } from "../../constants/routes";

export default function EditPostPage() {
  const { id } = useParams(); // Get post ID from URL
  const { updatePost, fetchPostById, currentPost, loading } = usePosts();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingPost, setLoadingPost] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await actionService.getCategories();
        setCategories(categoriesResponse.categories);

        // Fetch the post to edit
        await fetchPostById(id);

        setLoadingCategories(false);
        setLoadingPost(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        message.error("Failed to load post or categories");
        setLoadingCategories(false);
        setLoadingPost(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, fetchPostById]);

  const handleUpdate = async (postData, status) => {
    try {
      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("content", postData.content);
      formData.append("category_id", postData.category_id);
      formData.append("status", status);

      // Only append image if a new file was uploaded
      if (postData.fileList && postData.fileList.length > 0) {
        formData.append("image", postData.fileList[0]);
      }

      await updatePost(id, formData);
      message.success(
        status === "published"
          ? "Post updated and published!"
          : "Post saved as draft!",
      );

      // Navigate based on status
      if (status === "draft") {
        // Go to My Posts page where drafts are visible
        navigate(ROUTES.CURRENT_USER_POSTS);
      } else {
        // Go to home page to see the published post
        navigate(ROUTES.HOME);
      }
    } catch (error) {
      console.error("Failed to update post:", error);
      message.error(error.response?.data?.message || "Failed to update post");
    }
  };

  const handlePublish = (postData) => handleUpdate(postData, "published");
  const handleSaveDraft = (postData) => handleUpdate(postData, "draft");

  if (loadingPost || loadingCategories) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#ffffff",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#ffffff",
          padding: "20px",
        }}
      >
        <Card>
          <h2>Post not found</h2>
          <p>
            The post you're trying to edit doesn't exist or has been deleted.
          </p>
        </Card>
      </div>
    );
  }

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
            Edit Post
          </h1>
        </Card>
        <PostForm
          initialValues={{
            title: currentPost.title,
            content: currentPost.content,
            category_id: currentPost.category_id,
            image: currentPost.image,
          }}
          onPublish={handlePublish}
          onSaveDraft={handleSaveDraft}
          loading={loading}
          categories={categories}
          loadingCategories={loadingCategories}
          isEditing={true}
        />
      </div>
    </div>
  );
}
