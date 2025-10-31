import React from "react";
import { Card, Typography, Tag, Space, Divider } from "antd";
import { TagsOutlined, FireOutlined, BookOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const CategoryPage = () => {
  const categories = [
    { name: "Programming", count: 1234, color: "blue" },
    { name: "JavaScript", count: 987, color: "gold" },
    { name: "React", count: 856, color: "cyan" },
    { name: "Web Design", count: 743, color: "purple" },
    { name: "AI", count: 692, color: "magenta" },
    { name: "CSS", count: 589, color: "green" },
    { name: "Best Practices", count: 512, color: "volcano" },
    { name: "UX Design", count: 478, color: "orange" },
  ];

  const trendingTopics = [
    "React 19 New Features",
    "AI in Development",
    "CSS Container Queries",
    "TypeScript Tips",
    "Web Accessibility",
  ];

  return (
    <Space
      direction="vertical"
      size={24}
      style={{
        width: "100%",
        position: "sticky",
        top: "20px",
        marginTop: 100,
      }}
    >
      <Card
        style={{
          borderRadius: 12,
          border: "1px solid #e8e8e8",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          <Space align="center" size={8}>
            <TagsOutlined style={{ fontSize: 18, color: "#667eea" }} />
            <Title level={5} style={{ margin: 0, fontSize: 16 }}>
              Popular Categories
            </Title>
          </Space>

          <Space direction="vertical" size={8} style={{ width: "100%" }}>
            {categories.map((category) => (
              <div
                key={category.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.paddingLeft = "8px";
                  e.currentTarget.style.background = "#f9f9f9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.paddingLeft = "0";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <Text style={{ fontSize: 14 }}>{category.name}</Text>
                <Tag
                  color={category.color}
                  style={{
                    fontSize: 11,
                    borderRadius: 12,
                    padding: "2px 8px",
                  }}
                >
                  {category.count}
                </Tag>
              </div>
            ))}
          </Space>
        </Space>
      </Card>
      {/*
   <Card
        style={{
          borderRadius: 12,
          border: "1px solid #e8e8e8",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >

        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          <Space align="center" size={8}>
            <FireOutlined style={{ fontSize: 18, color: "#ff6b6b" }} />
            <Title level={5} style={{ margin: 0, fontSize: 16 }}>
              Trending Topics
            </Title>
          </Space>

          <Space direction="vertical" size={12} style={{ width: "100%" }}>
            {trendingTopics.map((topic, index) => (
              <div key={index}>
                <Text
                  style={{
                    fontSize: 14,
                    cursor: "pointer",
                    display: "block",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#667eea")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(0, 0, 0, 0.88)")
                  }
                >
                  {topic}
                </Text>
                {index < trendingTopics.length - 1 && (
                  <Divider style={{ margin: "12px 0" }} />
                )}
              </div>
            ))}
          </Space>
        </Space>
      </Card>

    
    */}
      <Card
        style={{
          borderRadius: 12,
          border: "1px solid #e8e8e8",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          background: "linear-gradient(135deg, #667eea10 0%, #764ba210 100%)",
        }}
      >
        <Space direction="vertical" size={8} style={{ width: "100%" }}>
          <Space align="center" size={8}>
            <BookOutlined style={{ fontSize: 16, color: "#667eea" }} />
            <Title level={5} style={{ margin: 0, fontSize: 15 }}>
              Reading List
            </Title>
          </Space>
          <Text style={{ fontSize: 13, color: "#666" }}>
            Click the bookmark icon on any post to save it to your reading list
          </Text>
        </Space>
      </Card>
    </Space>
  );
};

export default CategoryPage;
