import React from "react";
import { Card, Space, Avatar, Button, Tag, Typography, Dropdown } from "antd";
import {
  HeartOutlined,
  HeartFilled, // Add this import
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import { imgService } from "../../services/imgService";
const { Text, Paragraph } = Typography;

export default function CommentItem({
  comment,
  isAuthor = false,
  isReply = false,
  onReply,
  onLike,
  onEdit,
  onDelete,
  onReport,
  currentUserId,
}) {
  // Check if current user owns this comment
  const isOwner = currentUserId && comment.userId === currentUserId;

  // Create menu items based on ownership
  const getMenuItems = () => {
    if (isOwner) {
      // Owner can edit and delete
      return [
        {
          key: "edit",
          label: "Edit",
          icon: <EditOutlined />,
          onClick: () => onEdit?.(comment),
        },
        {
          key: "delete",
          label: "Delete",
          icon: <DeleteOutlined />,
          danger: true,
          onClick: () => onDelete?.(comment.id),
        },
      ];
    } else {
      // Non-owner can only report
      return [
        {
          key: "report",
          label: "Report",
          icon: <FlagOutlined />,
          danger: true,
          onClick: () => onReport?.(comment.id),
        },
      ];
    }
  };

  return (
    <Card
      type="inner"
      style={
        isReply
          ? {
              marginLeft: "48px",
              marginTop: "12px",
              background: "#fafafa",
            }
          : {}
      }
    >
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Space>
            <Avatar
              src={comment.avatar || null}
              alt={comment.name}
              style={{
                backgroundColor: !comment.avatar ? "#f56a00" : undefined,
                verticalAlign: "middle",
              }}
            >
              {!comment.avatar && comment.name?.[0]?.toUpperCase()}
            </Avatar>

            <div>
              <Text strong>{comment.name}</Text>
              {isAuthor}
              <br />
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {comment.time}
              </Text>
            </div>
          </Space>

          {/* Three-dot menu */}
          <Dropdown
            menu={{ items: getMenuItems() }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button
              type="text"
              icon={<MoreOutlined />}
              size="small"
              style={{ marginTop: "-8px" }}
            />
          </Dropdown>
        </div>

        <Paragraph style={{ marginLeft: "48px", marginBottom: "8px" }}>
          {comment.text}
        </Paragraph>

        <Space style={{ marginLeft: "48px" }}>
          <Button
            type="text"
            size="small"
            icon={
              comment.isLiked ? (
                <HeartFilled style={{ color: "#ff4d4f" }} />
              ) : (
                <HeartOutlined />
              )
            }
            onClick={() => onLike?.(comment.id)}
          >
            {comment.likes}
          </Button>
          <Button
            type="text"
            size="small"
            onClick={() => onReply?.(comment.id)}
          >
            Reply
          </Button>
        </Space>

        {/* Render nested replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div>
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                isAuthor={reply.isAuthor}
                isReply={true}
                onReply={onReply}
                onLike={onLike}
                onEdit={onEdit}
                onDelete={onDelete}
                onReport={onReport}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </Space>
    </Card>
  );
}
