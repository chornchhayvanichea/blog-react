import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  Table,
  Tag,
  Spin,
  message,
} from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  WarningOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { postService } from "../../services/postService";
import { actionService } from "../../services/actionsService";
import api from "../../services/api";
import API_ENDPOINTS from "../../constants/apiEndPoints";
import { ROUTES } from "../../constants/routes";

const { Title, Text } = Typography;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalReports: 0,
    totalViews: 0,
  });
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch all data in parallel
      const [postsData, reportsData, usersData] = await Promise.all([
        postService.getAllPosts(),
        actionService.reportsList(),
        api.get(API_ENDPOINTS.ADMIN.USERS_LIST),
      ]);

      // Calculate stats
      const posts = postsData.posts || [];
      const totalViews = posts.reduce(
        (sum, post) => sum + (post.views || 0),
        0,
      );

      setStats({
        totalUsers: usersData.data?.data?.users?.length || 0,
        totalPosts: posts.length,
        totalReports: reportsData.data?.reports?.length || 0,
        totalViews: totalViews,
      });

      // Get recent posts (top 5)
      setRecentPosts(posts.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      message.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Author",
      key: "author",
      render: (_, record) => record.user?.name || "Unknown",
    },
    {
      title: "Category",
      key: "category",
      render: (_, record) => (
        <Tag color="blue">{record.category?.name || "N/A"}</Tag>
      ),
    },
    {
      title: "Views",
      dataIndex: "views",
      key: "views",
    },
    {
      title: "Likes",
      dataIndex: "likes",
      key: "likes",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "published" ? "success" : "default"}>
          {status?.toUpperCase()}
        </Tag>
      ),
    },
  ];

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Title level={2}>Admin Dashboard</Title>

        {/* Stats Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Users"
                value={stats.totalUsers}
                prefix={<UserOutlined />}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Posts"
                value={stats.totalPosts}
                prefix={<FileTextOutlined />}
                valueStyle={{ color: "#722ed1" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Views"
                value={stats.totalViews}
                prefix={<EyeOutlined />}
                valueStyle={{ color: "#fa8c16" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card
              hoverable
              onClick={() => navigate(ROUTES.ADMIN_REPORTS)}
              style={{ cursor: "pointer" }}
            >
              <Statistic
                title="Pending Reports"
                value={stats.totalReports}
                prefix={<WarningOutlined />}
                valueStyle={{ color: "#ff4d4f" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Recent Posts Table */}
        <Card title={<Text strong>Recent Posts</Text>}>
          <Table
            columns={columns}
            dataSource={recentPosts}
            pagination={false}
            rowKey="id"
          />
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
