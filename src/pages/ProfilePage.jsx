import React, { useState, useEffect } from "react";
import {
  Typography,
  Space,
  Row,
  Col,
  Avatar,
  Button,
  Segmented,
  Divider,
  Spin,
  Empty,
  message,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  FileTextOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/posts/PostCard";
import { useAuth } from "../contexts/AuthContext";
import { usePosts } from "../contexts/PostContext";
import { actionService } from "../services/actionsService";
import { imgService } from "../services/imgService";
import { ROUTES } from "../constants/routes";

const { Title, Text, Paragraph } = Typography;

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const { user, refreshUser } = useAuth(); // <- Auth context
  const { posts, loading, fetchCurrentUserPosts, fetchAllPosts } = usePosts();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's posts and all posts for liked posts
    fetchCurrentUserPosts();
    fetchAllPosts();
  }, [fetchCurrentUserPosts, fetchAllPosts]);

  // Filter posts based on active tab
  const displayedPosts =
    activeTab === "posts"
      ? posts.filter((post) => post.user?.id === user?.id)
      : posts.filter((post) => post.is_liked);

  // Calculate stats
  const userPosts = posts.filter((post) => post.user?.id === user?.id);
  const totalPosts = userPosts.length;
  const totalLikes = userPosts.reduce(
    (sum, post) => sum + (post.likes || 0),
    0,
  );
  const totalViews = userPosts.reduce(
    (sum, post) => sum + (post.views || 0),
    0,
  );

  const avatarUrl = user?.profile?.avatar
    ? imgService.getImage(user.profile.avatar)
    : null;

  const handlePostClick = (postId) => {
    navigate(ROUTES.POST_DETAIL(postId));
  };

  const handleLike = async (postId) => {
    try {
      await actionService.toggleLike("post", postId);
      await fetchCurrentUserPosts();
      await fetchAllPosts();
      await refreshUser(); // optional: update user stats after like
    } catch (error) {
      console.error("Failed to like post:", error);
      message.error("Failed to like post");
    }
  };

  const handleBookmark = async (postId) => {
    try {
      await actionService.toggleBookmark(postId);
      await fetchCurrentUserPosts();
      await fetchAllPosts();
    } catch (error) {
      console.error("Failed to bookmark post:", error);
      message.error("Failed to bookmark post");
    }
  };

  const handleEdit = (postId) => navigate(ROUTES.POST_EDIT(postId));
  const handleEditProfile = () => navigate(ROUTES.PROFILE_EDIT);

  if (!user) {
    return (
      <div style={{ textAlign: "center", padding: 60 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "32px 20px",
        maxWidth: 2000,
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
                    size={200}
                    src={avatarUrl}
                    icon={<UserOutlined />}
                    style={{ border: "4px solid #f0f0f0" }}
                  >
                    {!avatarUrl && user?.name?.[0]?.toUpperCase()}
                  </Avatar>
                </Col>

                <Col xs={24} sm={24} md={16}>
                  <Space
                    direction="vertical"
                    size={16}
                    style={{ width: "100%" }}
                  >
                    <div>
                      <Title level={1} style={{ margin: 0, fontSize: 32 }}>
                        {user?.name || "User"}
                      </Title>
                      <Text type="secondary" style={{ fontSize: 15 }}>
                        @
                        {user?.username || user?.email?.split("@")[0] || "user"}
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
                      {user?.profile?.bio ||
                        "Welcome to my profile! Share your thoughts and connect with others."}
                    </Paragraph>

                    <Space size={12} wrap>
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="large"
                        onClick={handleEditProfile}
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
                      {totalPosts}
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
                      {totalLikes}
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
                      {totalViews}
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
            <Segmented
              value={activeTab}
              onChange={setActiveTab}
              size="large"
              options={[
                {
                  label: (
                    <Space>
                      <FileTextOutlined />
                      My Posts ({userPosts.length})
                    </Space>
                  ),
                  value: "posts",
                },
                {
                  label: (
                    <Space>
                      <HeartOutlined />
                      Liked ({posts.filter((p) => p.is_liked).length})
                    </Space>
                  ),
                  value: "liked",
                },
              ]}
              style={{ padding: 4, borderRadius: 8 }}
            />

            {/* Posts List */}
            <div>
              {loading ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <Spin size="large" />
                </div>
              ) : displayedPosts.length === 0 ? (
                <Empty
                  description={
                    activeTab === "posts"
                      ? "No posts yet"
                      : "No liked posts yet"
                  }
                  style={{ padding: "60px 0" }}
                />
              ) : (
                displayedPosts.map((post, index) => (
                  <PostCard
                    key={post.id}
                    {...post}
                    initialLiked={post.is_liked}
                    initialBookmarked={post.is_bookmarked}
                    showEdit={user?.id === post.user?.id}
                    showDelete={user?.id === post.user?.id}
                    isLast={index === displayedPosts.length - 1}
                    onClick={() => handlePostClick(post.id)}
                    onLike={() => handleLike(post.id)}
                    onBookmark={() => handleBookmark(post.id)}
                    onComment={() => handlePostClick(post.id)}
                    onView={() => handlePostClick(post.id)}
                    onEdit={() => handleEdit(post.id)}
                    onDelete={() => console.log("Delete post:", post.id)}
                    onReport={() => console.log("Report post:", post.id)}
                  />
                ))
              )}
            </div>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
