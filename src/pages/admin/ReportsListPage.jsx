import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Typography,
  message,
  Spin,
  Popconfirm,
  Avatar,
} from "antd";
import {
  WarningOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { actionService } from "../../services/actionsService";
import { postService } from "../../services/postService";
import { imgService } from "../../services/imgService";

const { Title, Text } = Typography;

const ReportsListPage = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await actionService.reportsList();
      console.log("🔥 FULL RESPONSE:", response);

      const reportsData = response.data?.reports || response.reports || [];

      console.log("🔥 REPORTS ARRAY:", reportsData);
      console.log("🔥 FIRST REPORT FULL:", reportsData[0]); // ADD THIS LINE
      setReports(reportsData);
    } catch (error) {
      console.error("Error fetching reports:", error);
      message.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };
  const handleDeletePost = async (postId) => {
    try {
      setActionLoading(postId);
      await postService.deletePost({ post_id: postId });
      message.success("Post deleted successfully");
      fetchReports(); // Refresh the list
    } catch (error) {
      console.error("Error deleting post:", error);
      message.error("Failed to delete post");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRestorePost = async (postId) => {
    try {
      setActionLoading(postId);
      await actionService.retorePost(postId);
      message.success("Post restored successfully");
      fetchReports(); // Refresh the list
    } catch (error) {
      console.error("Error restoring post:", error);
      message.error("Failed to restore post");
    } finally {
      setActionLoading(null);
    }
  };

  const columns = [
    {
      title: "Reporter",
      key: "reporter",
      render: (_, record) => <Text>{record.reporter?.name || "Unknown"}</Text>,
    },
    {
      title: "Reported Item",
      key: "item",
      render: (_, record) => (
        <div>
          <Text strong>
            {record.reportable_type === "Post" ? "Post" : "Comment"}
          </Text>
          <br />
          <Text type="secondary" ellipsis style={{ maxWidth: 300 }}>
            {record.reportable?.title || record.reportable?.content || "N/A"}
          </Text>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "reportable_type",
      key: "type",
      render: (type) => (
        <Tag color={type === "Post" ? "blue" : "purple"}>{type}</Tag>
      ),
    },
    {
      /*
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colors = {
          pending: "warning",
          resolved: "success",
          rejected: "error",
        };
        return (
          <Tag color={colors[status] || "default"}>{status?.toUpperCase()}</Tag>
        );
      },
    */
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => new Date(date).toLocaleDateString(),
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
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }}>
          <Title level={2}>
            <WarningOutlined /> Reports Management
          </Title>
          <Text type="secondary">
            Review and manage reported content ({reports.length} reports)
          </Text>
        </div>

        <Card>
          <Table
            columns={columns}
            dataSource={reports}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showTotal: (total) => `Total ${total} reports`,
            }}
          />
        </Card>
      </div>
    </div>
  );
};

export default ReportsListPage;
