import React, { useState } from "react";
import {
  Avatar,
  Typography,
  Space,
  Tag,
  Row,
  Col,
  Button,
  Divider,
  Dropdown,
} from "antd";
import {
  UserOutlined,
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  BookFilled,
  BookOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  FlagOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { imgService } from "../../services/imgService";
import { actionService } from "../../services/actionsService";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import ReportModal from "../reports/ReportModal";
const { Text, Title, Paragraph } = Typography;

const PostCard = ({
  id,
  user,
  category,
  title,
  content,
  image,
  likes = 0,
  comments = 0,
  bookmarks = 0,
  views = 0,
  created_at,
  onClick,
  onLike,
  onBookmark,
  onComment,
  initialLiked = false,
  initialBookmarked = false,
  isLast = false,
  onEdit,
  onDelete,
  onReport,
  onView,
  showEdit = true,
  showDelete = true,
}) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [bookmarkCount, setBookmarkCount] = useState(bookmarks);
  const [viewCount, setViewCount] = useState(views);
  const [reportModalVisible, setReportModalVisible] = useState(false);

  const avatarUrl = user?.avatar ? imgService.getImage(user.avatar) : null;
  const coverImageUrl = image ? imgService.getImage(image) : null;

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}w ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    const years = Math.floor(days / 365);
    return `${years}y ago`;
  };

  const formatViewCount = (count) => {
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}k`;
    return `${(count / 1000000).toFixed(1)}m`;
  };

  const handleCardClick = async () => {
    try {
      const newViews = await actionService.postViews(id);
      setViewCount(newViews);
    } catch (err) {
      console.error("Failed to increment views:", err);
    }
    onClick?.();
  };

  const handleLike = (e) => {
    e.stopPropagation();
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikeCount(newLiked ? likeCount + 1 : likeCount - 1);
    onLike?.(newLiked);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    const newBookmarked = !isBookmarked;
    setIsBookmarked(newBookmarked);
    setBookmarkCount(newBookmarked ? bookmarkCount + 1 : bookmarkCount - 1);
    onBookmark?.(newBookmarked);
  };

  const handleComment = (e) => {
    e.stopPropagation();
    onComment?.();
  };

  const menuItems = [
    {
      key: "view",
      label: "View",
      icon: <EyeOutlined />,
      onClick: (e) => {
        e.domEvent.stopPropagation();
        onView?.();
      },
    },
    showEdit && {
      key: "edit",
      label: "Edit",
      icon: <EditOutlined />,
      onClick: (e) => {
        e.domEvent.stopPropagation();
        navigate(ROUTES.EDIT_POST(id));
        onEdit?.();
      },
    },
    showDelete && {
      key: "delete",
      label: "Delete",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: (e) => {
        e.domEvent.stopPropagation();
        onDelete?.();
      },
    },
    { type: "divider" },
    {
      key: "report",
      label: "Report",
      icon: <FlagOutlined />,
      onClick: (e) => {
        e.domEvent.stopPropagation();
        console.log("Report post:", id);
        setReportModalVisible(true); // Add this line
      },
    },
  ].filter(Boolean);

  return (
    <div>
      <div
        onClick={handleCardClick}
        style={{ padding: "20px 0", cursor: "pointer", transition: "all 0.2s" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#fafafa")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
      >
        <Row gutter={16}>
          {coverImageUrl && (
            <Col xs={24} sm={8} md={8}>
              <div
                style={{
                  width: "100%",
                  height: "180px",
                  background: `url(${coverImageUrl}) center/cover`,
                  borderRadius: "8px",
                }}
              />
            </Col>
          )}

          <Col
            xs={24}
            sm={coverImageUrl ? 16 : 24}
            md={coverImageUrl ? 16 : 24}
          >
            <Space direction="vertical" size={12} style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                {category?.name && (
                  <Tag
                    color="blue"
                    style={{
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "2px 8px",
                      border: "none",
                    }}
                  >
                    {category.name.toUpperCase()}
                  </Tag>
                )}

                <Dropdown
                  menu={{ items: menuItems }}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <Button
                    type="text"
                    size="small"
                    icon={<MoreOutlined />}
                    onClick={(e) => e.stopPropagation()}
                    style={{ marginLeft: "auto", color: "#999" }}
                  />
                </Dropdown>
              </div>

              <Title
                level={4}
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 600,
                  lineHeight: 1.4,
                  color: "#1a1a1a",
                }}
              >
                {title}
              </Title>

              <Paragraph
                ellipsis={{ rows: 2 }}
                style={{
                  margin: 0,
                  fontSize: 14,
                  color: "#666",
                  lineHeight: 1.6,
                }}
              >
                {content}
              </Paragraph>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <Space size={8} align="center">
                  <Avatar src={avatarUrl} size={32} icon={<UserOutlined />}>
                    {!avatarUrl && user?.name?.[0]?.toUpperCase()}
                  </Avatar>
                  <div>
                    <Text
                      strong
                      style={{
                        fontSize: 13,
                        display: "block",
                        lineHeight: 1.3,
                      }}
                    >
                      {user?.name || "Unknown User"}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {formatRelativeTime(created_at)}
                    </Text>
                  </div>
                </Space>

                <Space size={16}>
                  <Space size={4}>
                    <EyeOutlined style={{ fontSize: 12, color: "#999" }} />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {formatViewCount(viewCount)}
                    </Text>
                  </Space>

                  <Button
                    type="text"
                    size="small"
                    onClick={handleLike}
                    icon={
                      isLiked ? (
                        <HeartFilled style={{ color: "#ff4d4f" }} />
                      ) : (
                        <HeartOutlined style={{ color: "#999" }} />
                      )
                    }
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: isLiked ? "#ff4d4f" : "#999",
                        fontWeight: isLiked ? 600 : 400,
                      }}
                    >
                      {likeCount}
                    </Text>
                  </Button>

                  <Button
                    type="text"
                    size="small"
                    onClick={handleComment}
                    icon={<MessageOutlined style={{ color: "#999" }} />}
                  >
                    <Text style={{ fontSize: 12, color: "#999" }}>
                      {comments}
                    </Text>
                  </Button>

                  <Button
                    type="text"
                    size="small"
                    onClick={handleBookmark}
                    icon={
                      isBookmarked ? (
                        <BookFilled style={{ color: "#1890ff" }} />
                      ) : (
                        <BookOutlined style={{ color: "#999" }} />
                      )
                    }
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: isBookmarked ? "#1890ff" : "#999",
                        fontWeight: isBookmarked ? 600 : 400,
                      }}
                    >
                      {bookmarkCount}
                    </Text>
                  </Button>
                </Space>
              </div>
            </Space>
          </Col>
        </Row>
      </div>
      {!isLast && <Divider style={{ margin: 0 }} />}
      <ReportModal
        visible={reportModalVisible}
        onClose={() => setReportModalVisible(false)}
        postId={id}
        type="post"
      />{" "}
    </div>
  );
};

export default PostCard;
