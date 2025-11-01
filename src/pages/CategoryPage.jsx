import React, { useEffect, useState } from "react";
import { Card, Typography, Tag, Space, Divider, Spin } from "antd";
import { TagsOutlined, BookOutlined } from "@ant-design/icons";
import { actionService } from "../services/actionsService";
const { Title, Text } = Typography;

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await actionService.getCategories();
        setCategories(res.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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
            {loading ? (
              <Spin />
            ) : (
              categories.map((category) => (
                <div
                  key={category.category_id}
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
                  <Text style={{ fontSize: 14 }}>{category.category_name}</Text>
                  <Tag
                    color="blue" // or choose dynamic color logic if you want
                    style={{
                      fontSize: 11,
                      borderRadius: 12,
                      padding: "2px 8px",
                    }}
                  >
                    {category.posts_count}
                  </Tag>
                </div>
              ))
            )}
          </Space>
        </Space>
      </Card>

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
