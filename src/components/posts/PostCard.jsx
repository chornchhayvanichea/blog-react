import React from "react";
import { Card, Avatar, Typography, Space, Tag, Row, Col } from "antd";
import {
  ClockCircleOutlined,
  UserOutlined,
  HeartOutlined,
  MessageOutlined,
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
}) => {
  return (
    <Card
      hoverable
      onClick={onClick}
      style={{
        marginBottom: 20,
        //      borderRadius: 12,
        border: "none",
        //        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        transition: "all 0.3s ease",
        background: "transparent",
      }}
    >
      <Row gutter={0}>
        {/* Cover Image */}
        {coverImage && (
          <Col xs={0} sm={0} md={10}>
            <div
              style={{
                width: "100%",
                height: "100%",
                minHeight: "200px",
                background: `url(${coverImage}) center/cover`,
                borderRadius: "12px 0 0 12px",
              }}
            />
          </Col>
        )}

        {/* Content */}
        <Col xs={24} sm={24} md={coverImage ? 14 : 24}>
          <div style={{ padding: "16px" }}>
            <Space direction="vertical" size={10} style={{ width: "100%" }}>
              {/* Tags */}
              {tags.length > 0 && (
                <Space size={6} wrap>
                  {tags.slice(0, 2).map((tag, index) => (
                    <Tag
                      key={index}
                      color="blue"
                      style={{
                        borderRadius: 4,
                        fontSize: 10,
                        fontWeight: 600,
                        padding: "1px 8px",
                        border: "none",
                      }}
                    >
                      {tag.toUpperCase()}
                    </Tag>
                  ))}
                </Space>
              )}

              {/* Title */}
              <Title
                level={4}
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 600,
                  lineHeight: 1.3,
                  color: "#1a1a1a",
                }}
              >
                {title}
              </Title>

              {/* Excerpt */}
              <Paragraph
                ellipsis={{ rows: 2 }}
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: "#666",
                  lineHeight: 1.5,
                }}
              >
                {excerpt}
              </Paragraph>

              {/* Meta Info */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 6,
                  paddingTop: 10,
                  borderTop: "1px solid #f0f0f0",
                }}
              >
                <Space size={6} align="center">
                  <Avatar
                    src={authorAvatar}
                    size={28}
                    icon={<UserOutlined />}
                  />
                  <div>
                    <Text
                      strong
                      style={{
                        fontSize: 12,
                        display: "block",
                        lineHeight: 1.2,
                      }}
                    >
                      {author}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 11 }}>
                      {publishDate}
                    </Text>
                  </div>
                </Space>

                <Space
                  size={12}
                  style={{ color: "#999", fontSize: 11, flexWrap: "wrap" }}
                >
                  <Space size={3}>
                    <ClockCircleOutlined style={{ fontSize: 11 }} />
                    <Text type="secondary" style={{ fontSize: 11 }}>
                      {readTime}
                    </Text>
                  </Space>
                  <Space size={3}>
                    <HeartOutlined style={{ fontSize: 11 }} />
                    <Text type="secondary" style={{ fontSize: 11 }}>
                      {likes}
                    </Text>
                  </Space>
                  <Space size={3}>
                    <MessageOutlined style={{ fontSize: 11 }} />
                    <Text type="secondary" style={{ fontSize: 11 }}>
                      {comments}
                    </Text>
                  </Space>
                </Space>
              </div>
            </Space>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default PostCard;
