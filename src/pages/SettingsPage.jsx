import React, { useState } from "react";
import {
  Typography,
  Space,
  Row,
  Col,
  Input,
  Button,
  Switch,
  Divider,
  message,
  Card,
} from "antd";
import {
  SettingOutlined,
  UserOutlined,
  BellOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;

const SettingsPage = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    message.success("Settings saved successfully!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px 20px",
        background: "#ffffff",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <Space direction="vertical" size={24} style={{ width: "100%" }}>
          {/* Header */}
          <div>
            <Title level={2} style={{ marginBottom: 8 }}>
              Settings
            </Title>
            <Text type="secondary" style={{ fontSize: 15 }}>
              Manage your account settings and preferences
            </Text>
          </div>

          {/* Profile Information Section */}
          <Card
            title={
              <Space>
                <UserOutlined />
                <Text strong>Profile Information</Text>
              </Space>
            }
          >
            <Space direction="vertical" size={16} style={{ width: "100%" }}>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <div>
                    <Text strong style={{ display: "block", marginBottom: 8 }}>
                      Display Name
                    </Text>
                    <Input
                      placeholder="Enter your name"
                      defaultValue="Sarah Johnson"
                      size="large"
                    />
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div>
                    <Text strong style={{ display: "block", marginBottom: 8 }}>
                      Username
                    </Text>
                    <Input
                      placeholder="Enter username"
                      defaultValue="sarahjohnson"
                      prefix="@"
                      size="large"
                    />
                  </div>
                </Col>
              </Row>

              <div>
                <Text strong style={{ display: "block", marginBottom: 8 }}>
                  Email
                </Text>
                <Input
                  placeholder="Enter your email"
                  defaultValue="sarah.johnson@example.com"
                  size="large"
                  type="email"
                />
              </div>

              <div>
                <Text strong style={{ display: "block", marginBottom: 8 }}>
                  Bio
                </Text>
                <TextArea
                  placeholder="Tell us about yourself"
                  defaultValue="Software engineer passionate about clean code and web development. Writing about React, JavaScript, and best practices."
                  rows={4}
                  maxLength={200}
                  showCount
                />
              </div>
            </Space>
          </Card>

          {/* Privacy & Security Section */}
          <Card
            title={
              <Space>
                <LockOutlined />
                <Text strong>Privacy & Security</Text>
              </Space>
            }
          >
            <Space direction="vertical" size={20} style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                }}
              >
                <div>
                  <Text strong style={{ display: "block", marginBottom: 4 }}>
                    Public Profile
                  </Text>
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    Make your profile visible to everyone
                  </Text>
                </div>
                <Switch
                  checked={profileVisibility}
                  onChange={setProfileVisibility}
                />
              </div>

              <Divider style={{ margin: "12px 0" }} />

              <div>
                <Text
                  strong
                  style={{
                    display: "block",
                    marginBottom: 16,
                  }}
                >
                  Change Password
                </Text>
                <Space direction="vertical" size={12} style={{ width: "100%" }}>
                  <Input.Password
                    placeholder="Current password"
                    size="large"
                    iconRender={(visible) =>
                      visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                  />
                  <Input.Password
                    placeholder="New password"
                    size="large"
                    iconRender={(visible) =>
                      visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                  />
                  <Input.Password
                    placeholder="Confirm new password"
                    size="large"
                    iconRender={(visible) =>
                      visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                  />
                </Space>
              </div>
            </Space>
          </Card>

          {/* Notifications & Preferences Section */}
          <Card
            title={
              <Space>
                <BellOutlined />
                <Text strong>Notifications & Preferences</Text>
              </Space>
            }
          >
            <Space direction="vertical" size={16} style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                }}
              >
                <div>
                  <Text strong style={{ display: "block", marginBottom: 4 }}>
                    Email Notifications
                  </Text>
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    Receive notifications via email
                  </Text>
                </div>
                <Switch
                  checked={emailNotifications}
                  onChange={setEmailNotifications}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                }}
              >
                <div>
                  <Text strong style={{ display: "block", marginBottom: 4 }}>
                    Push Notifications
                  </Text>
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    Receive push notifications in your browser
                  </Text>
                </div>
                <Switch
                  checked={pushNotifications}
                  onChange={setPushNotifications}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                }}
              >
                <div>
                  <Text strong style={{ display: "block", marginBottom: 4 }}>
                    Dark Mode
                  </Text>
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    Enable dark theme interface
                  </Text>
                </div>
                <Switch
                  checked={darkMode}
                  onChange={setDarkMode}
                  checkedChildren="🌙"
                  unCheckedChildren="☀️"
                />
              </div>
            </Space>
          </Card>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "flex-end",
              paddingBottom: 24,
            }}
          >
            <Button size="large">Cancel</Button>
            <Button type="primary" size="large" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default SettingsPage;
