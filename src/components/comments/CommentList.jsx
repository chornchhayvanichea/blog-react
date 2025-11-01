import React from "react";
import { Space, Button } from "antd";
import CommentItem from "./CommentItem";

export default function CommentList({
  comments,
  onLoadMore,
  onReply,
  onLike,
  onEdit,
  onDelete,
  onReport,
  currentUserId,
}) {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isAuthor={comment.isAuthor}
          onReply={onReply}
          onLike={onLike}
          onEdit={onEdit}
          onDelete={onDelete}
          onReport={onReport}
          currentUserId={currentUserId}
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
