import React, { useEffect } from "react";
import { Card, Typography, Spin, Empty, message } from "antd";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";
import { usePosts } from "../../contexts/PostContext";
import { useAuth } from "../../contexts/AuthContext"; // ← Add this
import { actionService } from "../../services/actionsService";
import { ROUTES } from "../../constants/routes";

const { Title, Text } = Typography;

const PostList = () => {
  const { posts, loading, fetchAllPosts } = usePosts();
  const { user } = useAuth(); // ← Add this
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPosts();
  }, []);

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

  return (
    <>
      <Title level={3}>Share Your Thoughts</Title>
      <Text style={{ color: "grey" }}>
        Explore posts, bookmark favorites, and join the conversation.
      </Text>
      <Card
        style={{
          borderRadius: 0,
          border: "1px solid #e8e8e8",
          marginTop: 10,
        }}
        bodyStyle={{ padding: "24px" }}
      >
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <Spin size="large" />
          </div>
        ) : posts.length === 0 ? (
          <Empty description="No posts found" />
        ) : (
          posts.map((post, index) => (
            <PostCard
              key={post.id}
              {...post}
              initialLiked={post.is_liked}
              initialBookmarked={post.is_bookmarked}
              showEdit={user?.id === post.user?.id} // ← Add this
              showDelete={user?.id === post.user?.id} // ← Add this
              isLast={index === posts.length - 1}
              onClick={() => handlePostClick(post.id)}
              onLike={() => handleLike(post.id)}
              onBookmark={() => handleBookmark(post.id)}
              onComment={() => handlePostClick(post.id)}
              onView={() => handlePostClick(post.id)}
              onEdit={() => console.log("Edit post:", post.id)}
              onDelete={() => console.log("Delete post:", post.id)}
              onReport={() => console.log("Report post:", post.id)}
            />
          ))
        )}
      </Card>
    </>
  );
};

export default PostList;
