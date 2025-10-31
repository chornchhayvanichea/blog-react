import React, { useState } from "react";
import {
  Card,
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
  ClockCircleOutlined,
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

const { Text, Title, Paragraph } = Typography;

const PostCard = ({
  title,
  excerpt,
  author,
  authorAvatar,
  publishDate,
  readTime,
  tags = [],
  coverImage,
  likes = 0,
  comments = 0,
  onClick,
  onLike,
  bookmarks,
  onBookmark,
  initialBookmarked = false,
  onComment,
  initialLiked = false,
  isLast = false,
  onEdit,
  onDelete,
  onReport,
  onView,
  showEdit = true,
  showDelete = true,
}) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [bookmarkCount, setBookmarkCount] = useState(bookmarks);

  const handleBookmark = (e) => {
    e.stopPropagation();
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    setBookmarkCount(newBookmarkState ? bookmarkCount + 1 : bookmarkCount - 1);
    onBookmark?.(newBookmarkState);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount(newLikedState ? likeCount + 1 : likeCount - 1);
    onLike?.(newLikedState);
  };

  const handleComment = (e) => {
    e.stopPropagation();
    onComment?.();
  };

  // Dropdown menu items
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
    {
      type: "divider",
    },
    {
      key: "report",
      label: "Report",
      icon: <FlagOutlined />,
      onClick: (e) => {
        e.domEvent.stopPropagation();
        onReport?.();
      },
    },
  ].filter(Boolean);

  return (
    <div>
      <div
        onClick={onClick}
        style={{
          padding: "20px 0",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#fafafa";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <Row gutter={16}>
          {coverImage && (
            <Col xs={24} sm={8} md={8}>
              <div
                style={{
                  width: "100%",
                  height: "180px",
                  background: `url(${coverImage}) center/cover`,
                  borderRadius: "8px",
                }}
              />
            </Col>
          )}

          <Col xs={24} sm={coverImage ? 16 : 24} md={coverImage ? 16 : 24}>
            <Space direction="vertical" size={12} style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                {tags.length > 0 && (
                  <Space size={6} wrap>
                    {tags.slice(0, 2).map((tag, index) => (
                      <Tag
                        key={index}
                        color="blue"
                        style={{
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "2px 8px",
                          border: "none",
                        }}
                      >
                        {tag.toUpperCase()}
                      </Tag>
                    ))}
                  </Space>
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
                    style={{
                      marginLeft: "auto",
                      color: "#999",
                    }}
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
                {excerpt}
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
                  <Avatar
                    src={authorAvatar}
                    size={32}
                    icon={<UserOutlined />}
                  />
                  <div>
                    <Text
                      strong
                      style={{
                        fontSize: 13,
                        display: "block",
                        lineHeight: 1.3,
                      }}
                    >
                      {author}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {publishDate}
                    </Text>
                  </div>
                </Space>

                <Space size={16}>
                  <Space size={4}>
                    <ClockCircleOutlined
                      style={{ fontSize: 12, color: "#999" }}
                    />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {readTime}
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
                    style={{
                      padding: "0 4px",
                      height: "auto",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
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
                    style={{
                      padding: "0 4px",
                      height: "auto",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
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
                        <BookFilled style={{ color: "#ff4d4f" }} />
                      ) : (
                        <BookOutlined style={{ color: "#999" }} />
                      )
                    }
                    style={{
                      padding: "0 4px",
                      height: "auto",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: isBookmarked ? "#ff4d4f" : "#999",
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
    </div>
  );
};

export default PostCard;
