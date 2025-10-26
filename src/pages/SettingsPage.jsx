import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
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

  const { darkMode, setDarkMode } = useTheme();
  const handleSave = () => {
    message.success("Settings saved successfully!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "32px 20px",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <Row justify="center">
        <Col xs={24}>
          <Space direction="vertical" size={48} style={{ width: "100%" }}>
            {/* Header */}
            <div style={{ paddingTop: 20 }}>
              <Space align="center" size={12} style={{ marginBottom: 8 }}>
                <SettingOutlined
                  style={{
                    fontSize: 36,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                />
                <Title
                  level={1}
                  style={{
                    fontWeight: 700,
                    fontSize: 36,
                    margin: 0,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Settings
                </Title>
              </Space>
              <Text style={{ fontSize: 15, color: "#666" }}>
                Manage your account settings and preferences
              </Text>
            </div>

            {/* Profile Information Section */}
            <div>
              <Space align="center" size={10} style={{ marginBottom: 24 }}>
                <UserOutlined style={{ fontSize: 20, color: "#667eea" }} />
                <Title level={3} style={{ margin: 0, fontSize: 20 }}>
                  Profile Information
                </Title>
              </Space>

              <Space direction="vertical" size={20} style={{ width: "100%" }}>
                <div>
                  <Text
                    strong
                    style={{ display: "block", marginBottom: 8, fontSize: 14 }}
                  >
                    Display Name
                  </Text>
                  <Input
                    placeholder="Enter your name"
                    defaultValue="Sarah Johnson"
                    size="large"
                    style={{ borderRadius: 8 }}
                  />
                </div>

                <div>
                  <Text
                    strong
                    style={{ display: "block", marginBottom: 8, fontSize: 14 }}
                  >
                    Username
                  </Text>
                  <Input
                    placeholder="Enter username"
                    defaultValue="sarahjohnson"
                    prefix="@"
                    size="large"
                    style={{ borderRadius: 8 }}
                  />
                </div>

                <div>
                  <Text
                    strong
                    style={{ display: "block", marginBottom: 8, fontSize: 14 }}
                  >
                    Bio
                  </Text>
                  <TextArea
                    placeholder="Tell us about yourself"
                    defaultValue="Software engineer passionate about clean code and web development. Writing about React, JavaScript, and best practices."
                    rows={4}
                    maxLength={200}
                    showCount
                    style={{ borderRadius: 8 }}
                  />
                </div>

                <div>
                  <Text
                    strong
                    style={{ display: "block", marginBottom: 8, fontSize: 14 }}
                  >
                    Email
                  </Text>
                  <Input
                    placeholder="Enter your email"
                    defaultValue="sarah.johnson@example.com"
                    size="large"
                    style={{ borderRadius: 8 }}
                  />
                </div>
                <div>
                  <Switch
                    checked={darkMode}
                    onChange={(checked) => setDarkMode(checked)}
                    checkedChildren="🌙"
                    unCheckedChildren="☀️"
                  />
                </div>
              </Space>
            </div>

            <Divider />

            {/* Privacy & Security Section */}
            <div>
              <Space align="center" size={10} style={{ marginBottom: 24 }}>
                <LockOutlined style={{ fontSize: 20, color: "#667eea" }} />
                <Title level={3} style={{ margin: 0, fontSize: 20 }}>
                  Privacy & Security
                </Title>
              </Space>

              <Space direction="vertical" size={24} style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <Text strong style={{ display: "block", fontSize: 14 }}>
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

                <div>
                  <Text
                    strong
                    style={{
                      display: "block",
                      marginBottom: 16,
                      fontSize: 14,
                    }}
                  >
                    Change Password
                  </Text>
                  <Space
                    direction="vertical"
                    size={12}
                    style={{ width: "100%" }}
                  >
                    <Input.Password
                      placeholder="Current password"
                      size="large"
                      style={{ borderRadius: 8 }}
                      iconRender={(visible) =>
                        visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                      }
                    />
                    <Input.Password
                      placeholder="New password"
                      size="large"
                      style={{ borderRadius: 8 }}
                      iconRender={(visible) =>
                        visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                      }
                    />
                    <Input.Password
                      placeholder="Confirm new password"
                      size="large"
                      style={{ borderRadius: 8 }}
                      iconRender={(visible) =>
                        visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Space>
                </div>
              </Space>
            </div>

            <Divider />

            {/* Notifications Section */}
            <div>
              <Space align="center" size={10} style={{ marginBottom: 24 }}>
                <BellOutlined style={{ fontSize: 20, color: "#667eea" }} />
                <Title level={3} style={{ margin: 0, fontSize: 20 }}>
                  Notifications
                </Title>
              </Space>

              <Space direction="vertical" size={24} style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <Text strong style={{ display: "block", fontSize: 14 }}>
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
                  }}
                >
                  <div>
                    <Text strong style={{ display: "block", fontSize: 14 }}>
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
              </Space>
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "flex-end",
                paddingBottom: 32,
                paddingTop: 16,
              }}
            >
              <Button size="large" style={{ borderRadius: 8 }}>
                Cancel
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={handleSave}
                style={{
                  borderRadius: 8,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                }}
              >
                Save Changes
              </Button>
            </div>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;
