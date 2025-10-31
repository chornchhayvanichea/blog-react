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
  Statistic,
  Progress,
} from "antd";
import {
  FlagOutlined,
  SearchOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MoreOutlined,
  UserOutlined,
  EyeOutlined,
  DeleteOutlined,
  CheckOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
  FireOutlined,
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
                  background: "#fafafa",
                  padding: "12px",
                  borderRadius: 8,
                  marginTop: 8,
                  borderLeft: "3px solid #d9d9d9",
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
  };

  // Statistics
  const stats = {
    total: allReports.length,
    pending: allReports.filter((r) => r.status === "pending").length,
    resolved: allReports.filter((r) => r.status === "resolved").length,
    dismissed: allReports.filter((r) => r.status === "dismissed").length,
    highSeverity: allReports.filter(
      (r) => r.severity === "high" && r.status === "pending",
    ).length,
  };

  const resolutionRate =
    stats.total > 0 ? ((stats.resolved / stats.total) * 100).toFixed(1) : 0;

  // Report categories breakdown
  const reportCategories = [
    {
      name: "Spam",
      count: allReports.filter((r) => r.reason.includes("Spam")).length,
      color: "#ff4d4f",
    },
    {
      name: "Harassment",
      count: allReports.filter((r) => r.reason.includes("Harassment")).length,
      color: "#ff7a45",
    },
    {
      name: "Misinformation",
      count: allReports.filter((r) => r.reason.includes("Misinformation"))
        .length,
      color: "#faad14",
    },
    {
      name: "Copyright",
      count: allReports.filter((r) => r.reason.includes("Copyright")).length,
      color: "#1890ff",
    },
    {
      name: "Other",
      count: allReports.filter(
        (r) =>
          !r.reason.includes("Spam") &&
          !r.reason.includes("Harassment") &&
          !r.reason.includes("Misinformation") &&
          !r.reason.includes("Copyright"),
      ).length,
      color: "#52c41a",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px 20px",
        background: "#ffffff",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <Space direction="vertical" size={24} style={{ width: "100%" }}>
          {/* Header */}
          <div>
            <Title level={2} style={{ marginBottom: 8 }}>
              Content Reports
            </Title>
            <Text type="secondary" style={{ fontSize: 15 }}>
              Manage and review reported content
            </Text>
          </div>

          {/* Statistics Cards */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Total Reports"
                  value={stats.total}
                  prefix={<FlagOutlined />}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Pending"
                  value={stats.pending}
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: "#faad14" }}
                />
                {stats.highSeverity > 0 && (
                  <Space style={{ marginTop: 8 }}>
                    <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />
                    <Text style={{ fontSize: 12, color: "#ff4d4f" }}>
                      {stats.highSeverity} high priority
                    </Text>
                  </Space>
                )}
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Resolved"
                  value={stats.resolved}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: "#52c41a" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Resolution Rate"
                  value={resolutionRate}
                  suffix="%"
                  prefix={<FireOutlined />}
                  valueStyle={{ color: "#722ed1" }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            {/* Reports List */}
            <Col xs={24} lg={16}>
              <Card>
                {/* Search */}
                <Input
                  placeholder="Search reports by reason, description, or reporter..."
                  prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
                  size="large"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    borderRadius: 8,
                    marginBottom: 16,
                  }}
                />

                {/* Tab Navigation */}
                <div style={{ marginBottom: 24 }}>
                  <Segmented
                    value={activeTab}
                    onChange={setActiveTab}
                    block
                    options={[
                      {
                        label: (
                          <Space>
                            <ClockCircleOutlined />
                            <span>Pending</span>
                            {stats.pending > 0 && (
                              <Tag
                                color="orange"
                                style={{ margin: 0, fontSize: 11 }}
                              >
                                {stats.pending}
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
                  />
                </div>

                {/* Reports List */}
                <div style={{ maxHeight: "800px", overflowY: "auto" }}>
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
                      style={{ marginTop: 60, marginBottom: 60 }}
                    />
                  )}
                </div>
              </Card>
            </Col>

            {/* Report Categories Sidebar */}
            <Col xs={24} lg={8}>
              <Card title={<Text strong>Report Categories</Text>}>
                <Space direction="vertical" size={16} style={{ width: "100%" }}>
                  {reportCategories.map((category) => (
                    <div key={category.name}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 8,
                        }}
                      >
                        <Text strong>{category.name}</Text>
                        <Text type="secondary">{category.count} reports</Text>
                      </div>
                      <Progress
                        percent={(category.count / stats.total) * 100}
                        strokeColor={category.color}
                        showInfo={false}
                      />
                    </div>
                  ))}
                </Space>
              </Card>

              <Card
                title={<Text strong>Quick Actions</Text>}
                style={{ marginTop: 16 }}
              >
                <Space direction="vertical" size={12} style={{ width: "100%" }}>
                  <Button
                    block
                    icon={<WarningOutlined />}
                    danger={stats.highSeverity > 0}
                    type={stats.highSeverity > 0 ? "primary" : "default"}
                  >
                    Review High Priority ({stats.highSeverity})
                  </Button>
                  <Button block icon={<CheckCircleOutlined />}>
                    Bulk Resolve
                  </Button>
                  <Button block icon={<DeleteOutlined />}>
                    Clear Dismissed
                  </Button>
                </Space>
              </Card>

              <Card
                title={<Text strong>Recent Activity</Text>}
                style={{ marginTop: 16 }}
              >
                <Space direction="vertical" size={12} style={{ width: "100%" }}>
                  <div>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Today
                    </Text>
                    <div style={{ marginTop: 4 }}>
                      <Text strong style={{ fontSize: 20 }}>
                        3
                      </Text>
                      <Text
                        type="secondary"
                        style={{ marginLeft: 8, fontSize: 12 }}
                      >
                        new reports
                      </Text>
                    </div>
                  </div>
                  <div>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      This Week
                    </Text>
                    <div style={{ marginTop: 4 }}>
                      <Text strong style={{ fontSize: 20 }}>
                        12
                      </Text>
                      <Text
                        type="secondary"
                        style={{ marginLeft: 8, fontSize: 12 }}
                      >
                        reports resolved
                      </Text>
                    </div>
                  </div>
                  <div>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Avg. Response Time
                    </Text>
                    <div style={{ marginTop: 4 }}>
                      <Text strong style={{ fontSize: 20 }}>
                        2.5h
                      </Text>
                      <Text
                        type="secondary"
                        style={{ marginLeft: 8, fontSize: 12 }}
                      >
                        ↓ 20% faster
                      </Text>
                    </div>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </Space>
      </div>
    </div>
  );
};

export default AdminReportsPage;
