import React, { useState } from "react";
import {
  Card,
  Table,
  Avatar,
  Typography,
  Space,
  Button,
  Tag,
  Input,
  Select,
  Modal,
  Dropdown,
  message,
  Badge,
  Statistic,
  Row,
  Col,
  Tooltip,
} from "antd";
import {
  UserOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
  MoreOutlined,
  MailOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

const ManageUsersPage = () => {
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock Users Data
  const [users, setUsers] = useState([
    {
      key: 1,
      id: "USR001",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
      role: "admin",
      status: "active",
      posts: 45,
      followers: 1234,
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
      verified: true,
    },
    {
      key: 2,
      id: "USR002",
      name: "Michael Chen",
      email: "m.chen@example.com",
      avatar: "https://i.pravatar.cc/150?img=3",
      role: "author",
      status: "active",
      posts: 38,
      followers: 892,
      joinDate: "2024-02-20",
      lastActive: "1 day ago",
      verified: true,
    },
    {
      key: 3,
      id: "USR003",
      name: "Emily Rodriguez",
      email: "emily.r@example.com",
      avatar: "https://i.pravatar.cc/150?img=5",
      role: "author",
      status: "suspended",
      posts: 32,
      followers: 654,
      joinDate: "2024-03-10",
      lastActive: "3 days ago",
      verified: false,
    },
    {
      key: 4,
      id: "USR004",
      name: "David Park",
      email: "david.p@example.com",
      avatar: "https://i.pravatar.cc/150?img=8",
      role: "user",
      status: "active",
      posts: 8,
      followers: 145,
      joinDate: "2024-08-05",
      lastActive: "1 hour ago",
      verified: true,
    },
    {
      key: 5,
      id: "USR005",
      name: "Lisa Thompson",
      email: "lisa.t@example.com",
      avatar: "https://i.pravatar.cc/150?img=12",
      role: "user",
      status: "inactive",
      posts: 2,
      followers: 23,
      joinDate: "2024-09-22",
      lastActive: "2 weeks ago",
      verified: false,
    },
    {
      key: 6,
      id: "USR006",
      name: "James Wilson",
      email: "james.w@example.com",
      avatar: "https://i.pravatar.cc/150?img=15",
      role: "author",
      status: "active",
      posts: 28,
      followers: 567,
      joinDate: "2024-04-12",
      lastActive: "5 hours ago",
      verified: true,
    },
  ]);

  // Statistics
  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    suspended: users.filter((u) => u.status === "suspended").length,
    admins: users.filter((u) => u.role === "admin").length,
  };

  // Handle user actions
  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleDelete = (user) => {
    Modal.confirm({
      title: "Delete User",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      onOk() {
        setUsers(users.filter((u) => u.key !== user.key));
        message.success(`${user.name} has been deleted`);
      },
    });
  };

  const handleSuspend = (user) => {
    const newStatus = user.status === "suspended" ? "active" : "suspended";
    setUsers(
      users.map((u) => (u.key === user.key ? { ...u, status: newStatus } : u)),
    );
    message.success(
      `${user.name} has been ${newStatus === "suspended" ? "suspended" : "activated"}`,
    );
  };

  const handleChangeRole = (user, newRole) => {
    setUsers(
      users.map((u) => (u.key === user.key ? { ...u, role: newRole } : u)),
    );
    message.success(`${user.name}'s role has been changed to ${newRole}`);
  };

  const getActionItems = (user) => [
    {
      key: "edit",
      icon: <EditOutlined />,
      label: "Edit User",
      onClick: () => handleEdit(user),
    },
    {
      key: "email",
      icon: <MailOutlined />,
      label: "Send Email",
      onClick: () => message.info(`Sending email to ${user.email}`),
    },
    {
      key: "suspend",
      icon: user.status === "suspended" ? <UnlockOutlined /> : <LockOutlined />,
      label: user.status === "suspended" ? "Activate" : "Suspend",
      onClick: () => handleSuspend(user),
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      label: "Delete User",
      danger: true,
      onClick: () => handleDelete(user),
    },
  ];

  // Table columns
  const columns = [
    {
      title: "User",
      key: "user",
      render: (_, record) => (
        <Space>
          <Badge
            dot
            status={record.status === "active" ? "success" : "default"}
            offset={[-5, 35]}
          >
            <Avatar src={record.avatar} size={40} icon={<UserOutlined />} />
          </Badge>
          <div>
            <Space size={4}>
              <Text strong style={{ display: "block" }}>
                {record.name}
              </Text>
              {record.verified && (
                <Tooltip title="Verified">
                  <CheckCircleOutlined
                    style={{ color: "#1890ff", fontSize: 12 }}
                  />
                </Tooltip>
              )}
            </Space>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.email}
            </Text>
          </div>
        </Space>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "User ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Text code>{id}</Text>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role, record) => (
        <Select
          value={role}
          size="small"
          style={{ width: 100 }}
          onChange={(value) => handleChangeRole(record, value)}
        >
          <Option value="user">User</Option>
          <Option value="author">Author</Option>
          <Option value="admin">Admin</Option>
        </Select>
      ),
      filters: [
        { text: "Admin", value: "admin" },
        { text: "Author", value: "author" },
        { text: "User", value: "user" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const configs = {
          active: { color: "success", text: "Active" },
          suspended: { color: "error", text: "Suspended" },
          inactive: { color: "default", text: "Inactive" },
        };
        return <Tag color={configs[status].color}>{configs[status].text}</Tag>;
      },
      filters: [
        { text: "Active", value: "active" },
        { text: "Suspended", value: "suspended" },
        { text: "Inactive", value: "inactive" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Posts",
      dataIndex: "posts",
      key: "posts",
      sorter: (a, b) => a.posts - b.posts,
      render: (posts) => <Text>{posts}</Text>,
    },
    {
      title: "Followers",
      dataIndex: "followers",
      key: "followers",
      sorter: (a, b) => a.followers - b.followers,
      render: (followers) => <Text>{followers.toLocaleString()}</Text>,
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
      sorter: (a, b) => new Date(a.joinDate) - new Date(b.joinDate),
    },
    {
      title: "Last Active",
      dataIndex: "lastActive",
      key: "lastActive",
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Dropdown menu={{ items: getActionItems(record) }} trigger={["click"]}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.id.toLowerCase().includes(searchText.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div style={{ padding: "24px", background: "#ffffff", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <Title level={2} style={{ marginBottom: 8 }}>
            Manage Users
          </Title>
          <Text type="secondary">
            Manage user accounts, roles, and permissions
          </Text>
        </div>

        {/* Statistics Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Users"
                value={stats.total}
                prefix={<UserOutlined />}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Active Users"
                value={stats.active}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: "#52c41a" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Suspended"
                value={stats.suspended}
                prefix={<CloseCircleOutlined />}
                valueStyle={{ color: "#ff4d4f" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Admins"
                value={stats.admins}
                prefix={<UserOutlined />}
                valueStyle={{ color: "#722ed1" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Main Content */}
        <Card>
          {/* Filters and Search */}
          <Space
            style={{
              width: "100%",
              justifyContent: "space-between",
              marginBottom: 16,
              flexWrap: "wrap",
            }}
          >
            <Space wrap>
              <Input
                placeholder="Search users..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 250 }}
                allowClear
              />
              <Select
                value={roleFilter}
                onChange={setRoleFilter}
                style={{ width: 120 }}
              >
                <Option value="all">All Roles</Option>
                <Option value="admin">Admin</Option>
                <Option value="author">Author</Option>
                <Option value="user">User</Option>
              </Select>
              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                style={{ width: 130 }}
              >
                <Option value="all">All Status</Option>
                <Option value="active">Active</Option>
                <Option value="suspended">Suspended</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Space>
            <Button type="primary" icon={<PlusOutlined />}>
              Add New User
            </Button>
          </Space>

          {/* Users Table */}
          <Table
            columns={columns}
            dataSource={filteredUsers}
            loading={loading}
            scroll={{ x: 1200 }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} users`,
            }}
            rowSelection={{
              selectedRowKeys: selectedUsers,
              onChange: setSelectedUsers,
            }}
          />

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div
              style={{
                marginTop: 16,
                padding: "12px 16px",
                background: "#e6f7ff",
                borderRadius: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>
                <strong>{selectedUsers.length}</strong> user(s) selected
              </Text>
              <Space>
                <Button size="small">Send Email</Button>
                <Button size="small">Change Role</Button>
                <Button size="small" danger>
                  Suspend
                </Button>
              </Space>
            </div>
          )}
        </Card>

        {/* Edit User Modal */}
        <Modal
          title={editingUser ? "Edit User" : "Add New User"}
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            setEditingUser(null);
          }}
          onOk={() => {
            setIsModalVisible(false);
            message.success("User saved successfully");
          }}
          okText="Save"
        >
          <div style={{ padding: "16px 0" }}>
            <Space direction="vertical" style={{ width: "100%" }} size="middle">
              <div>
                <Text strong>Name *</Text>
                <Input
                  placeholder="Enter user name"
                  style={{ marginTop: 8 }}
                  defaultValue={editingUser?.name}
                />
              </div>
              <div>
                <Text strong>Email *</Text>
                <Input
                  placeholder="Enter email address"
                  type="email"
                  style={{ marginTop: 8 }}
                  defaultValue={editingUser?.email}
                />
              </div>
              <div>
                <Text strong>Role *</Text>
                <Select
                  placeholder="Select role"
                  style={{ width: "100%", marginTop: 8 }}
                  defaultValue={editingUser?.role}
                >
                  <Option value="user">User</Option>
                  <Option value="author">Author</Option>
                  <Option value="admin">Admin</Option>
                </Select>
              </div>
              <div>
                <Text strong>Status *</Text>
                <Select
                  placeholder="Select status"
                  style={{ width: "100%", marginTop: 8 }}
                  defaultValue={editingUser?.status}
                >
                  <Option value="active">Active</Option>
                  <Option value="suspended">Suspended</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </div>
            </Space>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ManageUsersPage;
