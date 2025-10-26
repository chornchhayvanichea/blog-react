import React, { useState } from "react";
import {
  Typography,
  Space,
  Row,
  Col,
  Empty,
  Segmented,
  Input,
  Tag,
  Button,
  Card,
  Avatar,
  Dropdown,
} from "antd";
import {
  FlagTwoTone,
  SearchOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MoreOutlined,
  UserOutlined,
  EyeOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const ReportCard = ({ report, onAction }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "orange";
      case "resolved":
        return "green";
      case "dismissed":
        return "red";
      default:
        return "default";
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "#ff4d4f";
      case "medium":
        return "#faad14";
      case "low":
        return "#52c41a";
      default:
        return "#d9d9d9";
    }
  };

  const menuItems = [
    {
      key: "view",
      label: "View Details",
      icon: <EyeOutlined />,
    },
    {
      key: "resolve",
      label: "Mark as Resolved",
      icon: <CheckOutlined />,
      disabled: report.status === "resolved",
    },
    {
      key: "dismiss",
      label: "Dismiss Report",
      icon: <CloseCircleOutlined />,
      disabled: report.status === "dismissed",
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      label: "Delete",
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  return (
    <Card
      style={{
        marginBottom: 16,
        borderRadius: 12,
        border: "1px solid #f0f0f0",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      hoverable
      bodyStyle={{ padding: "20px 24px" }}
    >
      <Row gutter={[16, 16]} align="middle">
        <Col flex="auto">
          <Space direction="vertical" size={8} style={{ width: "100%" }}>
            <Space
              align="start"
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <Space direction="vertical" size={4}>
                <Space align="center" size={8}>
                  <Tag
                    color={getSeverityColor(report.severity)}
                    style={{ margin: 0, fontWeight: 600 }}
                  >
                    {report.severity.toUpperCase()}
                  </Tag>
                  <Tag
                    color={getStatusColor(report.status)}
                    style={{ margin: 0 }}
                  >
                    {report.status.toUpperCase()}
                  </Tag>
                </Space>
                <Text strong style={{ fontSize: 16 }}>
                  {report.reason}
                </Text>
              </Space>

              <Dropdown
                menu={{
                  items: menuItems,
                  onClick: ({ key }) => onAction(report.id, key),
                }}
                trigger={["click"]}
              >
                <Button
                  type="text"
                  icon={<MoreOutlined style={{ fontSize: 18 }} />}
                  onClick={(e) => e.stopPropagation()}
                />
              </Dropdown>
            </Space>

            <Text type="secondary" style={{ fontSize: 14 }}>
              {report.description}
            </Text>

            <Space split={<Text type="secondary">•</Text>} size={8}>
              <Space size={6}>
                <Avatar
                  src={report.reporterAvatar}
                  size={20}
                  icon={<UserOutlined />}
                />
                <Text type="secondary" style={{ fontSize: 13 }}>
                  Reported by {report.reporterName}
                </Text>
              </Space>
              <Text type="secondary" style={{ fontSize: 13 }}>
                {report.reportDate}
              </Text>
              <Text type="secondary" style={{ fontSize: 13 }}>
                Target: {report.targetType}
              </Text>
            </Space>

            {report.targetContent && (
              <div
                style={{
                  //      background: "#f5f5f5",
                  padding: "12px",
                  borderRadius: 8,
                  marginTop: 8,
                }}
              >
                <Text
                  type="secondary"
                  style={{ fontSize: 13, fontStyle: "italic" }}
                >
                  "{report.targetContent}"
                </Text>
              </div>
            )}
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

const AdminReportsPage = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");

  const allReports = [
    {
      id: 1,
      reason: "Spam Content",
      description:
        "User is posting repetitive promotional content across multiple posts",
      severity: "high",
      status: "pending",
      reporterName: "Alice Johnson",
      reporterAvatar: "https://i.pravatar.cc/150?img=5",
      reportDate: "Oct 25, 2025",
      targetType: "Post",
      targetContent:
        "Buy now! Limited time offer! Click here for amazing deals...",
    },
    {
      id: 2,
      reason: "Harassment",
      description: "Inappropriate comments targeting another user",
      severity: "high",
      status: "pending",
      reporterName: "Bob Smith",
      reporterAvatar: "https://i.pravatar.cc/150?img=11",
      reportDate: "Oct 26, 2025",
      targetType: "Comment",
      targetContent: null,
    },
    {
      id: 3,
      reason: "Misinformation",
      description: "Post contains false claims about recent events",
      severity: "medium",
      status: "pending",
      reporterName: "Carol White",
      reporterAvatar: "https://i.pravatar.cc/150?img=9",
      reportDate: "Oct 27, 2025",
      targetType: "Post",
      targetContent: "Breaking: Scientists confirm that...",
    },
    {
      id: 4,
      reason: "Inappropriate Content",
      description: "Content violates community guidelines",
      severity: "high",
      status: "resolved",
      reporterName: "David Lee",
      reporterAvatar: "https://i.pravatar.cc/150?img=12",
      reportDate: "Oct 20, 2025",
      targetType: "Post",
      targetContent: null,
    },
    {
      id: 5,
      reason: "Copyright Violation",
      description: "User posted copyrighted material without permission",
      severity: "medium",
      status: "resolved",
      reporterName: "Emma Davis",
      reporterAvatar: "https://i.pravatar.cc/150?img=16",
      reportDate: "Oct 22, 2025",
      targetType: "Post",
      targetContent: "Full article from premium publication...",
    },
    {
      id: 6,
      reason: "Spam Content",
      description: "Bot account posting promotional links",
      severity: "low",
      status: "dismissed",
      reporterName: "Frank Miller",
      reporterAvatar: "https://i.pravatar.cc/150?img=13",
      reportDate: "Oct 15, 2025",
      targetType: "Comment",
      targetContent: null,
    },
    {
      id: 7,
      reason: "Off-topic",
      description: "Post content not relevant to the community",
      severity: "low",
      status: "dismissed",
      reporterName: "Grace Wilson",
      reporterAvatar: "https://i.pravatar.cc/150?img=10",
      reportDate: "Oct 18, 2025",
      targetType: "Post",
      targetContent: "Check out my new recipe for chocolate cake!",
    },
  ];

  const filteredReports = allReports.filter((report) => {
    const matchesTab = report.status === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      report.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reporterName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleAction = (reportId, action) => {
    console.log(`Action: ${action} on report ${reportId}`);
    // Implement action logic here
  };

  const getPendingCount = () =>
    allReports.filter((r) => r.status === "pending").length;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "32px 20px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <Row justify="center">
        <Col xs={24} sm={24} md={22} lg={20} xl={18}>
          <Space direction="vertical" size={32} style={{ width: "100%" }}>
            {/* Header */}
            <div style={{ paddingTop: 20 }}>
              <Space align="center" size={12} style={{ marginBottom: 8 }}>
                <FlagTwoTone
                  twoToneColor="#ff4d4f"
                  style={{
                    fontSize: 36,
                  }}
                />
                <Title
                  level={1}
                  style={{
                    fontWeight: 700,
                    fontSize: 36,
                    margin: 0,
                    background:
                      "linear-gradient(135deg, #ff4d4f 0%, #ff7a45 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Content Reports
                </Title>
              </Space>
              <Row>
                <Text style={{ fontSize: 15, color: "#666" }}>
                  Manage and review reported content
                  {getPendingCount() > 0 && (
                    <Tag color="orange" style={{ marginLeft: 8 }}>
                      {getPendingCount()} pending
                    </Tag>
                  )}
                </Text>
              </Row>
            </div>

            {/* Search */}
            <Input
              placeholder="Search reports by reason, description, or reporter..."
              prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
              size="large"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                borderRadius: 8,
              }}
            />

            {/* Tab Navigation */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Segmented
                value={activeTab}
                onChange={setActiveTab}
                size="large"
                options={[
                  {
                    label: (
                      <Space>
                        <ClockCircleOutlined />
                        <span>Pending</span>
                        {getPendingCount() > 0 && (
                          <Tag
                            color="orange"
                            style={{ margin: 0, fontSize: 11 }}
                          >
                            {getPendingCount()}
                          </Tag>
                        )}
                      </Space>
                    ),
                    value: "pending",
                  },
                  {
                    label: (
                      <Space>
                        <CheckCircleOutlined />
                        <span>Resolved</span>
                      </Space>
                    ),
                    value: "resolved",
                  },
                  {
                    label: (
                      <Space>
                        <CloseCircleOutlined />
                        <span>Dismissed</span>
                      </Space>
                    ),
                    value: "dismissed",
                  },
                ]}
                style={{
                  padding: 4,
                  borderRadius: 8,
                }}
              />
            </div>

            {/* Reports List */}
            <div>
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    onAction={handleAction}
                  />
                ))
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <Space direction="vertical" size={8}>
                      <Text style={{ fontSize: 16, color: "#999" }}>
                        No {activeTab} reports
                        {searchQuery && " matching your search"}
                      </Text>
                      <Text type="secondary" style={{ fontSize: 14 }}>
                        {activeTab === "pending"
                          ? "All reports have been reviewed"
                          : `No ${activeTab} reports found`}
                      </Text>
                    </Space>
                  }
                  style={{ marginTop: 60 }}
                />
              )}
            </div>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default AdminReportsPage;
