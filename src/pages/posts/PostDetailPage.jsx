import React, { useEffect, useState } from "react";
import {
  Layout,
  Typography,
  Card,
  Avatar,
  Tag,
  Space,
  Divider,
  Row,
  Col,
  Button,
  Spin,
  message,
  Modal,
  Input,
  Dropdown,
} from "antd";
import {
  ClockCircleOutlined,
  EyeOutlined,
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
  UserOutlined,
  BookOutlined,
  BookFilled,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import CommentForm from "../../components/comments/CommentForm";
import CommentList from "../../components/comments/CommentList";
import { useParams, useNavigate } from "react-router-dom";
import { imgService } from "../../services/imgService";
import { usePosts } from "../../contexts/PostContext";
import { commentService } from "../../services/commentService";
import { actionService } from "../../services/actionsService";
import { useAuth } from "../../contexts/AuthContext";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentPost, loading, fetchPostById } = usePosts();
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const isOwner = user?.id === currentPost?.user_id;

  const handleEditPost = () => {
    navigate(`/post/${id}/edit`); // Or wherever your edit route is
  };

  const handleDeletePost = () => {
    Modal.confirm({
      title: "Delete Post",
      content: "Are you sure you want to delete this post?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          // Add your delete post API call here
          message.success("Post deleted successfully!");
          navigate(ROUTES.HOME);
        } catch (error) {
          console.error("Failed to delete post:", error);
          message.error("Failed to delete post");
        }
      },
    });
  };

  const postMenuItems = [
    isOwner && {
      key: "edit",
      label: "Edit",
      icon: <EditOutlined />,
      onClick: handleEditPost,
    },
    isOwner && {
      key: "delete",
      label: "Delete",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: handleDeletePost,
    },
  ].filter(Boolean);
  // Comments state
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);

  // Edit modal state
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    if (id) {
      fetchPostById(id).catch((error) => {
        message.error("Failed to load post");
        console.error(error);
      });
    }
  }, [id, fetchPostById]);
  useEffect(() => {
    if (currentPost) {
      setLikeCount(Number(currentPost.likes ?? 0));
      setBookmarkCount(Number(currentPost.bookmarks ?? 0));
      setIsLiked(Boolean(currentPost.is_liked));
      setIsBookmarked(Boolean(currentPost.is_bookmarked));
    }
  }, [currentPost]);

  // Fetch comments when post is loaded
  useEffect(() => {
    if (id) {
      fetchComments();
    }
  }, [id]);

  const fetchComments = async () => {
    setCommentsLoading(true);
    try {
      const response = await commentService.getComments(id);
      const transformedComments = response.comments.map((comment) => ({
        id: comment.id,
        name: comment.user.name,
        avatar: comment.user.avatar
          ? imgService.getImage(comment.user.avatar)
          : null,
        time: formatCommentTime(comment.created_at),
        text: comment.content,
        likes: comment.likes || 0,
        isLiked: comment.is_liked || false,
        isAuthor: currentPost ? comment.user.id === currentPost.user_id : false, // ← Add safety check
        userId: comment.user.id,
        replies: [],
      }));
      setComments(transformedComments);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
      message.error("Failed to load comments");
    } finally {
      setCommentsLoading(false);
    }
  };

  const formatCommentTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60)
      return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleSubmitComment = async (commentText) => {
    try {
      const response = await commentService.createComment(id, commentText);
      message.success("Comment posted successfully!");

      const newComment = {
        id: response.comment.id,
        name: response.comment.user.name,
        avatar: response.comment.user.avatar
          ? imgService.getImage(response.comment.user.avatar)
          : null,
        time: "Just now",
        text: response.comment.content,
        likes: response.comment.likes || 0,
        isLiked: response.comment.is_liked || false,
        isAuthor: response.comment.user.id === currentPost?.user_id,
        userId: response.comment.user.id,
        replies: [],
      };

      setComments([newComment, ...comments]);
    } catch (error) {
      console.error("Failed to post comment:", error);
      message.error("Failed to post comment. Please try again.");
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setEditContent(comment.text);
    setEditModalVisible(true);
  };

  const handleUpdateComment = async () => {
    if (!editContent.trim()) {
      message.warning("Comment cannot be empty");
      return;
    }

    try {
      const response = await commentService.updateComment(
        id,
        editContent,
        editingComment.id,
      );
      message.success("Comment updated successfully!");

      setComments(
        comments.map((comment) =>
          comment.id === editingComment.id
            ? {
                ...comment,
                text: response.comment.content,
                isLiked: response.comment.is_liked, // ← Add this
                likes: response.comment.likes, // ← Add this
              }
            : comment,
        ),
      );

      setEditModalVisible(false);
      setEditingComment(null);
      setEditContent("");
    } catch (error) {
      console.error("Failed to update comment:", error);
      message.error("Failed to update comment. Please try again.");
    }
  };
  const handleDeleteComment = (commentId) => {
    Modal.confirm({
      title: "Delete Comment",
      content: "Are you sure you want to delete this comment?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await commentService.deleteComment(id, commentId);
          message.success("Comment deleted successfully!");
          setComments(comments.filter((comment) => comment.id !== commentId));
        } catch (error) {
          console.error("Failed to delete comment:", error);
          message.error("Failed to delete comment. Please try again.");
        }
      },
    });
  };

  const handleReportComment = (commentId) => {
    Modal.confirm({
      title: "Report Comment",
      content: "Are you sure you want to report this comment for review?",
      okText: "Report",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await actionService.createReport("comment", commentId);
          message.success("Comment reported successfully!");
        } catch (error) {
          console.error("Failed to report comment:", error);
          message.error("Failed to report comment. Please try again.");
        }
      },
    });
  };

  const handleReply = (commentId) => {
    console.log("Reply to comment:", commentId);
    message.info("Reply functionality coming soon!");
  };

  const handleLikeComment = async (commentId) => {
    try {
      const response = await actionService.toggleLike("comment", commentId);

      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                likes: response.likes_count,
                isLiked: response.liked,
              }
            : comment,
        ),
      );
    } catch (error) {
      console.error("Failed to like comment:", error);
      message.error("Failed to like comment. Please try again.");
    }
  };

  const handleLoadMore = () => {
    console.log("Load more comments");
    message.info("Load more functionality coming soon!");
  };

  const handleLike = async () => {
    try {
      const response = await actionService.toggleLike("post", id);

      // Use backend as source of truth
      setIsLiked(response.liked);
      setLikeCount(response.likes_count);
    } catch (error) {
      console.error("Failed to like post:", error);
      message.error("Failed to like post. Please try again.");
    }
  };

  const handleBookmark = async () => {
    try {
      const response = await actionService.toggleBookmark(id);

      // Use backend as source of truth
      setIsBookmarked(response.is_bookmarked);
      // Bookmark count needs to come from backend too - you might need to update your API
      // For now, do optimistic update:
      setBookmarkCount(
        response.is_bookmarked ? bookmarkCount + 1 : bookmarkCount - 1,
      );
    } catch (error) {
      console.error("Failed to bookmark post:", error);
      message.error("Failed to bookmark post. Please try again.");
    }
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentPost?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      message.success("Link copied to clipboard!");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateReadTime = (text) => {
    const words = text?.split(/\s+/).length || 0;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  const formatViewCount = (count) => {
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}k`;
    return `${(count / 1000000).toFixed(1)}m`;
  };

  if (loading) {
    return (
      <Layout style={{ minHeight: "100vh", background: "#ffffff" }}>
        <Content style={{ padding: "40px 20px" }}>
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <Spin size="large" />
          </div>
        </Content>
      </Layout>
    );
  }
  if (!currentPost) {
    return (
      <Layout style={{ minHeight: "100vh", background: "#ffffff" }}>
        <Content style={{ padding: "40px 20px" }}>
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              textAlign: "center",
              paddingTop: "100px",
            }}
          >
            <Title level={3}>Post not found</Title>
            <Button type="primary" onClick={() => navigate("/")}>
              Go Back Home
            </Button>
          </div>
        </Content>
      </Layout>
    );
  }

  const coverImageUrl = currentPost.image
    ? imgService.getImage(currentPost.image)
    : null;
  const authorAvatarUrl = currentPost.user_avatar
    ? imgService.getImage(currentPost.user_avatar)
    : null;

  return (
    <Layout style={{ minHeight: "100vh", background: "#ffffff" }}>
      <Content style={{ padding: "40px 20px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Article Header */}
          <Card
            bordered={false}
            style={{ marginBottom: "24px" }}
            cover={
              coverImageUrl ? (
                <img
                  alt="article cover"
                  src={coverImageUrl}
                  style={{ height: "400px", objectFit: "cover" }}
                />
              ) : null
            }
          >
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ flex: 1 }}>
                  {currentPost.category_name && (
                    <Tag color="blue">{currentPost.category_name}</Tag>
                  )}
                  <Title
                    level={1}
                    style={{ marginTop: "16px", marginBottom: "16px" }}
                  >
                    {currentPost.title}
                  </Title>
                </div>

                {isOwner && (
                  <Dropdown
                    menu={{ items: postMenuItems }}
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <Button
                      type="text"
                      icon={<MoreOutlined />}
                      style={{ marginTop: "16px" }}
                    />
                  </Dropdown>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                <Space size="large">
                  <Space>
                    <ClockCircleOutlined />
                    <Text type="secondary">
                      {calculateReadTime(currentPost.content)}
                    </Text>
                  </Space>
                  <Space>
                    <EyeOutlined />
                    <Text type="secondary">
                      {formatViewCount(currentPost.views)} views
                    </Text>
                  </Space>
                  <Text type="secondary">
                    {formatDate(currentPost.created_at)}
                  </Text>
                </Space>
                <Space>
                  <Button
                    icon={
                      isLiked ? (
                        <HeartFilled style={{ color: "#ff4d4f" }} />
                      ) : (
                        <HeartOutlined />
                      )
                    }
                    type="text"
                    onClick={handleLike}
                  >
                    {likeCount}
                  </Button>

                  <Button
                    icon={
                      isBookmarked ? (
                        <BookFilled style={{ color: "#1890ff" }} />
                      ) : (
                        <BookOutlined />
                      )
                    }
                    type="text"
                    onClick={handleBookmark}
                  >
                    {bookmarkCount}
                  </Button>
                  <Button
                    icon={<ShareAltOutlined />}
                    type="text"
                    onClick={handleShare}
                  >
                    Share
                  </Button>
                </Space>
              </div>

              <Divider />

              {/* Author Info */}
              <Space>
                <Avatar size={48} src={authorAvatarUrl} icon={<UserOutlined />}>
                  {!authorAvatarUrl &&
                    currentPost.user_name?.charAt(0).toUpperCase()}
                </Avatar>
                <div>
                  <Text strong style={{ display: "block" }}>
                    {currentPost.user_name}
                  </Text>
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    Author
                  </Text>
                </div>
              </Space>
            </Space>
          </Card>

          {/* Article Content */}
          <Card bordered={false} style={{ marginBottom: "24px" }}>
            <Typography>
              <Paragraph
                style={{
                  fontSize: "16px",
                  lineHeight: "1.8",
                  whiteSpace: "pre-wrap",
                }}
              >
                {currentPost.content}
              </Paragraph>
            </Typography>
          </Card>

          {/* Comments Section */}
          <Card
            bordered={false}
            title={<Title level={3}>Comments ({comments.length})</Title>}
            style={{ marginBottom: "24px" }}
          >
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <CommentForm onSubmit={handleSubmitComment} />
              <Divider />
              {commentsLoading ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <Spin size="large" />
                </div>
              ) : comments.length > 0 ? (
                <CommentList
                  comments={comments}
                  onLoadMore={handleLoadMore}
                  onReply={handleReply}
                  onLike={handleLikeComment}
                  onEdit={handleEditComment}
                  onDelete={handleDeleteComment}
                  onReport={handleReportComment}
                  currentUserId={user?.id}
                />
              ) : (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <Text type="secondary">
                    No comments yet. Be the first to comment!
                  </Text>
                </div>
              )}
            </Space>
          </Card>
        </div>
      </Content>

      {/* Edit Comment Modal */}
      <Modal
        title="Edit Comment"
        open={editModalVisible}
        onOk={handleUpdateComment}
        onCancel={() => {
          setEditModalVisible(false);
          setEditingComment(null);
          setEditContent("");
        }}
        okText="Save"
        cancelText="Cancel"
      >
        <TextArea
          rows={4}
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          placeholder="Edit your comment..."
        />
      </Modal>
    </Layout>
  );
}
