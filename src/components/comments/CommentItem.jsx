import React from "react";
import { Card, Space, Avatar, Button, Tag, Typography } from "antd";
import { HeartOutlined } from "@ant-design/icons";

const { Text, Paragraph } = Typography;

export default function CommentItem({
  comment,
  isAuthor = false,
  isReply = false,
  onReply,
  onLike,
}) {
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
        <Space>
          <Avatar src={comment.avatar} />
          <div>
            <Text strong>{comment.name}</Text>
            {isAuthor && (
              <Tag color="blue" style={{ marginLeft: "8px" }}>
                Author
              </Tag>
            )}
            <br />
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {comment.time}
            </Text>
          </div>
        </Space>
        <Paragraph style={{ marginLeft: "48px", marginBottom: "8px" }}>
          {comment.text}
        </Paragraph>
        <Space style={{ marginLeft: "48px" }}>
          <Button
            type="text"
            size="small"
            icon={<HeartOutlined />}
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
              />
            ))}
          </div>
        )}
      </Space>
    </Card>
  );
}
