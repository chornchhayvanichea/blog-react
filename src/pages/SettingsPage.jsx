import React, { useState, useEffect } from "react";
import {
  Typography,
  Space,
  Row,
  Col,
  Input,
  Button,
  Switch,
  message,
  Card,
  Avatar,
  Upload,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  CameraOutlined,
  LoadingOutlined,
  FormatPainterOutlined,
} from "@ant-design/icons";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { imgService } from "../services/imgService";
import { userService } from "../services/userService";
import { authService } from "../services/authService";

const { Title, Text } = Typography;
const { TextArea } = Input;

const SettingsPage = () => {
  const { user, refreshUser } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  });

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  // Initialize form from user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || user.profile?.bio || "",
      });
      setAvatarPreview(
        user.avatar
          ? imgService.getImage(user.avatar)
          : user.profile?.avatar
            ? imgService.getImage(user.profile.avatar)
            : null,
      );
    }
  }, [user]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle password input changes
  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  // Validate before upload
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return false;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Store the file for later upload
    setAvatarFile(file);

    // Prevent automatic upload
    return false;
  };

  // Save profile settings
  const handleSave = async () => {
    try {
      setSaving(true);

      // Create FormData for file upload
      const formDataToSend = new FormData();

      // Add profile fields
      if (formData.name) formDataToSend.append("name", formData.name);
      if (formData.email) formDataToSend.append("email", formData.email);
      if (formData.bio) formDataToSend.append("bio", formData.bio);

      // Add avatar file if selected
      if (avatarFile) {
        formDataToSend.append("avatar", avatarFile);
      }

      // Update profile
      await userService.updateProfile(user.id, formDataToSend);

      // Refresh user data from context
      await refreshUser();

      // Clear avatar file after successful save
      setAvatarFile(null);

      message.success("Settings saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to save settings";
      message.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  // Change password
  const handleChangePassword = async () => {
    try {
      if (
        !passwordData.current_password ||
        !passwordData.new_password ||
        !passwordData.new_password_confirmation
      ) {
        message.warning("Please fill all password fields");
        return;
      }

      if (
        passwordData.new_password !== passwordData.new_password_confirmation
      ) {
        message.error("New passwords don't match");
        return;
      }

      if (passwordData.new_password.length < 8) {
        message.error("New password must be at least 8 characters");
        return;
      }

      setChangingPassword(true);

      await authService.changePassword(
        passwordData.current_password,
        passwordData.new_password,
        passwordData.new_password_confirmation,
      );

      // Clear password fields
      setPasswordData({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });

      message.success("Password changed successfully!");
    } catch (error) {
      console.error("Password change error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to change password";
      message.error(errorMessage);
    } finally {
      setChangingPassword(false);
    }
  };

  const uploadButton = (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: "#1890ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        border: "3px solid white",
      }}
    >
      {avatarLoading ? (
        <LoadingOutlined style={{ color: "white" }} />
      ) : (
        <CameraOutlined style={{ color: "white", fontSize: 18 }} />
      )}
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px 20px",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <Space direction="vertical" size={24} style={{ width: "100%" }}>
          {/* Header */}
          <div>
            <Title level={2}>Settings</Title>
            <Text type="secondary" style={{ fontSize: 15 }}>
              Manage your account settings and preferences
            </Text>
          </div>

          {/* Profile Info */}
          <Card
            title={
              <Space>
                <UserOutlined />
                <Text strong>Profile Information</Text>
              </Space>
            }
          >
            <Space direction="vertical" size={24} style={{ width: "100%" }}>
              {/* Avatar */}
              <div style={{ textAlign: "center" }}>
                <Upload
                  name="avatar"
                  listType="picture-circle"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                >
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <Avatar
                      size={120}
                      src={avatarPreview}
                      icon={<UserOutlined />}
                      style={{ border: "4px solid #f0f0f0" }}
                    >
                      {!avatarPreview && formData.name?.[0]?.toUpperCase()}
                    </Avatar>
                    {uploadButton}
                  </div>
                </Upload>
                <div style={{ marginTop: 12 }}>
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    Click camera icon to upload new avatar (max 2MB)
                  </Text>
                </div>
              </div>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <div>
                    <Text strong>Name</Text>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      size="large"
                      placeholder="Enter your name"
                    />
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div>
                    <Text strong>Email</Text>
                    <Input
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      size="large"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                </Col>
              </Row>

              <div>
                <Text strong>Bio</Text>
                <TextArea
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  rows={4}
                  maxLength={200}
                  showCount
                  placeholder="Tell us about yourself"
                />
              </div>

              {/* Save Profile Button */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleSave}
                  loading={saving}
                >
                  Save Profile
                </Button>
              </div>
            </Space>
          </Card>

          {/* Security */}
          <Card
            title={
              <Space>
                <LockOutlined />
                <Text strong>Security</Text>
              </Space>
            }
          >
            <Space direction="vertical" size={12} style={{ width: "100%" }}>
              <div>
                <Text strong>Current Password</Text>
                <Input.Password
                  placeholder="Enter current password"
                  size="large"
                  value={passwordData.current_password}
                  onChange={(e) =>
                    handlePasswordChange("current_password", e.target.value)
                  }
                  iconRender={(visible) =>
                    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                  }
                />
              </div>
              <div>
                <Text strong>New Password</Text>
                <Input.Password
                  placeholder="Enter new password (min 8 characters)"
                  size="large"
                  value={passwordData.new_password}
                  onChange={(e) =>
                    handlePasswordChange("new_password", e.target.value)
                  }
                  iconRender={(visible) =>
                    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                  }
                />
              </div>
              <div>
                <Text strong>Confirm New Password</Text>
                <Input.Password
                  placeholder="Confirm new password"
                  size="large"
                  value={passwordData.new_password_confirmation}
                  onChange={(e) =>
                    handlePasswordChange(
                      "new_password_confirmation",
                      e.target.value,
                    )
                  }
                  iconRender={(visible) =>
                    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                  }
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 8,
                }}
              >
                <Button
                  type="default"
                  onClick={handleChangePassword}
                  loading={changingPassword}
                >
                  Change Password
                </Button>
              </div>
            </Space>
          </Card>

          {/* Preferences */}
          <Card
            title={
              <Space>
                <FormatPainterOutlined />
                <Text strong>Preferences</Text>
              </Space>
            }
          >
            <Space direction="vertical" size={12} style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                }}
              >
                <div>
                  <Text strong>Dark Mode</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    Enable dark theme interface
                  </Text>
                </div>
                <Switch
                  checked={darkMode}
                  onChange={toggleTheme}
                  checkedChildren="🌙"
                  unCheckedChildren="☀️"
                />
              </div>
            </Space>
          </Card>
        </Space>
      </div>
    </div>
  );
};

export default SettingsPage;
