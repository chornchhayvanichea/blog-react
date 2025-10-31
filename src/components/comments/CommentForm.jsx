import React from "react";
import { Card, Space, Button } from "antd";
import { Typography } from "antd";

const { Text } = Typography;

export default function CommentForm({ onSubmit }) {
  const [comment, setComment] = React.useState("");

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit?.(comment);
      setComment("");
    }
  };

  return (
    <Card type="inner">
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Text strong>Leave a Comment</Text>
        <textarea
          placeholder="Share your thoughts..."
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #d9d9d9",
            borderRadius: "6px",
            fontSize: "14px",
            fontFamily: "inherit",
            resize: "vertical",
          }}
        />
        <Button type="primary" onClick={handleSubmit}>
          Post Comment
        </Button>
      </Space>
    </Card>
  );
}
