import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  Table,
  Tag,
  Space,
  Avatar,
  Button,
  Progress,
  Select,
  List,
} from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  EyeOutlined,
  HeartOutlined,
  MessageOutlined,
  RiseOutlined,
  FallOutlined,
  WarningOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState("7days");

  // Mock Statistics Data
  const stats = {
    totalUsers: 1247,
    userGrowth: 12.5,
    totalPosts: 856,
    postGrowth: 8.3,
    totalViews: 45620,
    viewGrowth: 15.7,
    totalEngagement: 12450,
    engagementGrowth: -3.2,
  };

  // Recent Posts Data
  const recentPosts = [
    {
      key: 1,
      title: "Understanding React Server Components",
      author: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      views: 2341,
      likes: 156,
      comments: 23,
      status: "published",
      date: "2025-10-28",
    },
    {
      key: 2,
      title: "The Future of Web Development",
      author: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=3",
      views: 1892,
      likes: 203,
      comments: 45,
      status: "published",
      date: "2025-10-27",
    },
    {
      key: 3,
      title: "CSS Grid vs Flexbox Guide",
      author: "Emily Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=5",
      views: 1456,
      likes: 98,
      comments: 12,
      status: "draft",
      date: "2025-10-26",
    },
    {
      key: 4,
      title: "JavaScript Best Practices 2025",
      author: "David Park",
      avatar: "https://i.pravatar.cc/150?img=8",
      views: 987,
      likes: 67,
      comments: 8,
      status: "pending",
      date: "2025-10-25",
    },
  ];

  // Top Authors Data
  const topAuthors = [
    {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      posts: 45,
      views: 12450,
      engagement: 95,
    },
    {
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=3",
      posts: 38,
      views: 10230,
      engagement: 88,
    },
    {
      name: "Emily Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=5",
      posts: 32,
      views: 8900,
      engagement: 82,
    },
    {
      name: "David Park",
      avatar: "https://i.pravatar.cc/150?img=8",
      posts: 28,
      views: 7650,
      engagement: 76,
    },
  ];

  // Recent Reports Data
  const recentReports = [
    {
      id: 1,
      type: "Spam",
      post: "How to Make Money Fast Online",
      reporter: "User #234",
      date: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      type: "Inappropriate Content",
      post: "Controversial Political Views",
      reporter: "User #156",
      date: "5 hours ago",
      status: "reviewing",
    },
    {
      id: 3,
      type: "Copyright",
      post: "Best Movie Quotes Collection",
      reporter: "User #789",
      date: "1 day ago",
      status: "resolved",
    },
  ];

  // Category Performance Data
  const categoryData = [
    { name: "Technology", posts: 245, percentage: 28.6 },
    { name: "Design", posts: 189, percentage: 22.1 },
    { name: "Development", posts: 167, percentage: 19.5 },
    { name: "Business", posts: 134, percentage: 15.7 },
    { name: "Lifestyle", posts: 121, percentage: 14.1 },
  ];

  const postColumns = [
    {
      title: "Post",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Space>
          <Avatar src={record.avatar} size="small" icon={<UserOutlined />} />
          <div>
            <Text strong style={{ display: "block", fontSize: 13 }}>
              {text}
            </Text>
            <Text type="secondary" style={{ fontSize: 11 }}>
              by {record.author}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Stats",
      key: "stats",
      render: (_, record) => (
        <Space size="large">
          <Space size={4}>
            <EyeOutlined style={{ color: "#8c8c8c" }} />
            <Text style={{ fontSize: 12 }}>{record.views}</Text>
          </Space>
          <Space size={4}>
            <HeartOutlined style={{ color: "#ff4d4f" }} />
            <Text style={{ fontSize: 12 }}>{record.likes}</Text>
          </Space>
          <Space size={4}>
            <MessageOutlined style={{ color: "#1890ff" }} />
            <Text style={{ fontSize: 12 }}>{record.comments}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colors = {
          published: "success",
          draft: "default",
          pending: "warning",
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => <Text style={{ fontSize: 12 }}>{date}</Text>,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button type="link" size="small">
          View
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px", background: "#ffffff", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div>
            <Title level={2} style={{ margin: 0 }}>
              Dashboard
            </Title>
            <Text type="secondary">Welcome back, Admin</Text>
          </div>
          <Select
            value={timeRange}
            onChange={setTimeRange}
            style={{ width: 150 }}
          >
            <Option value="24hours">Last 24 Hours</Option>
            <Option value="7days">Last 7 Days</Option>
            <Option value="30days">Last 30 Days</Option>
            <Option value="90days">Last 90 Days</Option>
          </Select>
        </div>

        {/* Statistics Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Users"
                value={stats.totalUsers}
                prefix={<UserOutlined />}
                valueStyle={{ color: "#1890ff" }}
              />
              <Space style={{ marginTop: 8 }}>
                {stats.userGrowth > 0 ? (
                  <RiseOutlined style={{ color: "#52c41a" }} />
                ) : (
                  <FallOutlined style={{ color: "#ff4d4f" }} />
                )}
                <Text
                  style={{
                    color: stats.userGrowth > 0 ? "#52c41a" : "#ff4d4f",
                    fontSize: 12,
                  }}
                >
                  {Math.abs(stats.userGrowth)}% vs last period
                </Text>
              </Space>
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
              <Space style={{ marginTop: 8 }}>
                {stats.postGrowth > 0 ? (
                  <RiseOutlined style={{ color: "#52c41a" }} />
                ) : (
                  <FallOutlined style={{ color: "#ff4d4f" }} />
                )}
                <Text
                  style={{
                    color: stats.postGrowth > 0 ? "#52c41a" : "#ff4d4f",
                    fontSize: 12,
                  }}
                >
                  {Math.abs(stats.postGrowth)}% vs last period
                </Text>
              </Space>
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
              <Space style={{ marginTop: 8 }}>
                {stats.viewGrowth > 0 ? (
                  <RiseOutlined style={{ color: "#52c41a" }} />
                ) : (
                  <FallOutlined style={{ color: "#ff4d4f" }} />
                )}
                <Text
                  style={{
                    color: stats.viewGrowth > 0 ? "#52c41a" : "#ff4d4f",
                    fontSize: 12,
                  }}
                >
                  {Math.abs(stats.viewGrowth)}% vs last period
                </Text>
              </Space>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Engagement"
                value={stats.totalEngagement}
                prefix={<HeartOutlined />}
                valueStyle={{ color: "#eb2f96" }}
              />
              <Space style={{ marginTop: 8 }}>
                {stats.engagementGrowth > 0 ? (
                  <RiseOutlined style={{ color: "#52c41a" }} />
                ) : (
                  <FallOutlined style={{ color: "#ff4d4f" }} />
                )}
                <Text
                  style={{
                    color: stats.engagementGrowth > 0 ? "#52c41a" : "#ff4d4f",
                    fontSize: 12,
                  }}
                >
                  {Math.abs(stats.engagementGrowth)}% vs last period
                </Text>
              </Space>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          {/* Recent Posts Table */}
          <Col xs={24}>
            <Card
              title={
                <Space>
                  <FileTextOutlined />
                  <Text strong>Recent Posts</Text>
                </Space>
              }
              extra={
                <Button type="link" size="small">
                  View All
                </Button>
              }
            >
              <Table
                columns={postColumns}
                dataSource={recentPosts}
                pagination={false}
                size="small"
              />
            </Card>
          </Col>

          {/* Category Performance */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <Space>
                  <FileTextOutlined />
                  <Text strong>Category Performance</Text>
                </Space>
              }
            >
              <Space direction="vertical" size={16} style={{ width: "100%" }}>
                {categoryData.map((cat) => (
                  <div key={cat.name}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      }}
                    >
                      <Text strong>{cat.name}</Text>
                      <Text type="secondary">
                        {cat.posts} posts ({cat.percentage}%)
                      </Text>
                    </div>
                    <Progress
                      percent={cat.percentage}
                      showInfo={false}
                      strokeColor="#1890ff"
                    />
                  </div>
                ))}
              </Space>
            </Card>
          </Col>

          {/* Recent Reports */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <Space>
                  <WarningOutlined />
                  <Text strong>Recent Reports</Text>
                </Space>
              }
              extra={
                <Button type="link" size="small">
                  View All
                </Button>
              }
            >
              <List
                dataSource={recentReports}
                renderItem={(report) => (
                  <List.Item
                    actions={[
                      <Button type="link" size="small" key="review">
                        Review
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          icon={<WarningOutlined />}
                          style={{ background: "#ff4d4f" }}
                        />
                      }
                      title={
                        <Space>
                          <Tag color="red">{report.type}</Tag>
                          <Text strong style={{ fontSize: 13 }}>
                            {report.post}
                          </Text>
                        </Space>
                      }
                      description={
                        <Space size={4}>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            Reported by {report.reporter}
                          </Text>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            · {report.date}
                          </Text>
                          <Tag
                            color={
                              report.status === "resolved"
                                ? "success"
                                : report.status === "reviewing"
                                  ? "processing"
                                  : "warning"
                            }
                            style={{ fontSize: 10 }}
                          >
                            {report.status}
                          </Tag>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminDashboard;
