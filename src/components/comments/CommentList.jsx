import React from "react";
import { Space, Button } from "antd";
import CommentItem from "./CommentItem";

export default function CommentList({ comments, onLoadMore, onReply, onLike }) {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isAuthor={comment.isAuthor}
          onReply={onReply}
          onLike={onLike}
        />
      ))}

      {onLoadMore && (
        <Button type="default" block onClick={onLoadMore}>
          Load More Comments
        </Button>
      )}
    </Space>
  );
}
