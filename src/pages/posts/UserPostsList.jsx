import React, { useState, useEffect } from "react";
import {
  Space,
  Row,
  Col,
  Typography,
  Divider,
  Segmented,
  Spin,
  Empty,
  message,
} from "antd";
import {
  BookOutlined,
  EditOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PostCard from "../../components/posts/PostCard";
import { usePosts } from "../../contexts/PostContext";
import { useAuth } from "../../contexts/AuthContext";
import { actionService } from "../../services/actionsService";
import { ROUTES } from "../../constants/routes";

const UserPostsList = () => {
  const { Title, Text } = Typography;
  const [postStatus, setPostStatus] = useState("published");
  const { posts, loading, fetchCurrentUserPosts } = usePosts();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCurrentUserPosts();
  }, [fetchCurrentUserPosts]);

  // Debug: Log the posts data
  useEffect(() => {
    console.log("Posts data:", posts);
    if (posts.length > 0) {
      console.log("First post structure:", posts[0]);
    }
  }, [posts]);

  // Filter posts based on selected status
  const currentPosts = posts.filter((post) => post.status === postStatus);

  const handlePostClick = (postId) => {
    navigate(ROUTES.POST_DETAIL(postId));
  };

  const handleLike = async (postId) => {
    try {
      await actionService.toggleLike("post", postId);
    } catch (error) {
      console.error("Failed to like post:", error);
      message.error("Failed to like post");
    }
  };

  const handleBookmark = async (postId) => {
    try {
      await actionService.toggleBookmark(postId);
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
                          <span>
                            Published (
                            {
                              posts.filter((p) => p.status === "published")
                                .length
                            }
                            )
                          </span>
                        </Space>
                      ),
                      value: "published",
                    },
                    {
                      label: (
                        <Space>
                          <EditOutlined />
                          <span>
                            Draft (
                            {posts.filter((p) => p.status === "draft").length})
                          </span>
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
                {loading ? (
                  <div style={{ textAlign: "center", padding: "60px 0" }}>
                    <Spin size="large" />
                  </div>
                ) : currentPosts.length === 0 ? (
                  <Empty
                    description={
                      postStatus === "published"
                        ? "No published posts yet"
                        : "No drafts yet"
                    }
                    style={{ padding: "60px 0" }}
                  />
                ) : (
                  currentPosts.map((post, index) => (
                    <PostCard
                      key={post.id}
                      {...post}
                      initialLiked={post.is_liked}
                      initialBookmarked={post.is_bookmarked}
                      showEdit={user?.id === post.user?.id}
                      showDelete={user?.id === post.user?.id}
                      isLast={index === currentPosts.length - 1}
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
              </div>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UserPostsList;
