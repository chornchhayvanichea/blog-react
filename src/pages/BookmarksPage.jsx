import React, { useEffect } from "react";
import { Space, Card, Row, Col, Typography, Spin, Empty, message } from "antd";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/posts/PostCard";
import { BookOutlined } from "@ant-design/icons";
import { usePosts } from "../contexts/PostContext";
import { useAuth } from "../contexts/AuthContext";
import { actionService } from "../services/actionsService";
import { ROUTES } from "../constants/routes";

const BookmarksPage = () => {
  const { Title, Text } = Typography;
  const { posts, loading, fetchAllPosts } = usePosts();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPosts();
  }, [fetchAllPosts]);

  // Filter only bookmarked posts
  const bookmarkedPosts = posts.filter((post) => post.is_bookmarked === true);

  const handlePostClick = (postId) => {
    navigate(ROUTES.POST_DETAIL(postId));
  };

  const handleLike = async (postId) => {
    try {
      await actionService.toggleLike("post", postId);
      // Refresh to update the like status
      await fetchAllPosts();
    } catch (error) {
      console.error("Failed to like post:", error);
      message.error("Failed to like post");
    }
  };

  const handleBookmark = async (postId) => {
    try {
      await actionService.toggleBookmark(postId);
      // Refresh to remove unbookmarked posts from the list
      await fetchAllPosts();
    } catch (error) {
      console.error("Failed to bookmark post:", error);
      message.error("Failed to bookmark post");
    }
  };

  const handleEdit = (postId) => {
    navigate(ROUTES.POST_EDIT(postId));
  };

  const handleDelete = async (postId) => {
    console.log("Delete post:", postId);
  };

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
                  <BookOutlined style={{ fontSize: 40, color: "#1890ff" }} />
                  <Title style={{ margin: 0 }}>Bookmarks List</Title>
                </Space>
                <Text style={{ color: "gray" }}>
                  This page shows all the posts you've saved for later.
                </Text>
              </Space>

              <Card
                style={{
                  borderRadius: 0,
                  border: "1px solid #e8e8e8",
                }}
                bodyStyle={{ padding: "24px" }}
              >
                {loading ? (
                  <div style={{ textAlign: "center", padding: "60px 0" }}>
                    <Spin size="large" />
                  </div>
                ) : bookmarkedPosts.length === 0 ? (
                  <Empty
                    description="No bookmarked posts yet"
                    style={{ padding: "60px 0" }}
                  />
                ) : (
                  bookmarkedPosts.map((post, index) => (
                    <PostCard
                      key={post.id}
                      {...post}
                      initialLiked={post.is_liked}
                      initialBookmarked={post.is_bookmarked}
                      showEdit={user?.id === post.user?.id}
                      showDelete={user?.id === post.user?.id}
                      isLast={index === bookmarkedPosts.length - 1}
                      onClick={() => handlePostClick(post.id)}
                      onLike={() => handleLike(post.id)}
                      onBookmark={() => handleBookmark(post.id)}
                      onComment={() => handlePostClick(post.id)}
                      onView={() => handlePostClick(post.id)}
                      onEdit={() => handleEdit(post.id)}
                      onDelete={() => handleDelete(post.id)}
                      onReport={() => console.log("Report post:", post.id)}
                    />
                  ))
                )}
              </Card>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BookmarksPage;
