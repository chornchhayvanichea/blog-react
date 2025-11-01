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
  Avatar,
  Input,
} from "antd";
import {
  UserOutlined,
  SearchOutlined,
  StopOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { actionService } from "../../services/actionsService";
import { imgService } from "../../services/imgService";
import api from "../../services/api";
import API_ENDPOINTS from "../../constants/apiEndPoints";

const { Title, Text } = Typography;

const ManageUsersPage = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchText) {
      const filtered = users.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchText, users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get(API_ENDPOINTS.ADMIN.USERS_LIST);
      const usersData = response.data?.data?.users || [];
      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBan = async (userId, isBanned) => {
    try {
      setActionLoading(userId);
      await actionService.toggleBan(userId);
      message.success(
        isBanned ? "User unbanned successfully" : "User banned successfully",
      );
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error("Error toggling ban:", error);
      message.error("Failed to update user status");
    } finally {
      setActionLoading(null);
    }
  };

  const columns = [
    {
      title: "User",
      key: "user",
      render: (_, record) => (
        <Space>
          <Avatar
            src={
              record.profile?.avatar
                ? imgService.getImage(record.profile.avatar)
                : null
            }
            icon={<UserOutlined />}
          >
            {!record.profile?.avatar && record.name?.[0]?.toUpperCase()}
          </Avatar>
          <div>
            <Text strong style={{ display: "block" }}>
              {record.name}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.email}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "admin" ? "red" : "blue"}>
          {role?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag color={record.is_banned ? "error" : "success"}>
          {record.is_banned ? "BANNED" : "ACTIVE"}
        </Tag>
      ),
    },
    {
      title: "Posts",
      dataIndex: "posts_count",
      key: "posts_count",
      render: (count) => count || 0,
    },
    {
      title: "Joined",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          {record.role !== "admin" && (
            <Button
              type={record.is_banned ? "default" : "primary"}
              danger={!record.is_banned}
              size="small"
              icon={
                record.is_banned ? <CheckCircleOutlined /> : <StopOutlined />
              }
              onClick={() => handleToggleBan(record.id, record.is_banned)}
              loading={actionLoading === record.id}
            >
              {record.is_banned ? "Unban" : "Ban"}
            </Button>
          )}
          {record.role === "admin" && <Tag color="red">Protected</Tag>}
        </Space>
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
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }}>
          <Title level={2}>
            <UserOutlined /> Users Management
          </Title>
          <Text type="secondary">Manage all users ({users.length} total)</Text>
        </div>

        <Card>
          <div style={{ marginBottom: 16 }}>
            <Input
              placeholder="Search by name or email..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ maxWidth: 400 }}
            />
          </div>

          <Table
            columns={columns}
            dataSource={filteredUsers}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showTotal: (total) => `Total ${total} users`,
            }}
          />
        </Card>
      </div>
    </div>
  );
};

export default ManageUsersPage;
