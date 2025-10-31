import React from "react";
import { ROUTES } from "../../constants/routes";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useAuth } from "../../contexts/AuthContext";

const LoginForm = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await login(values.email, values.password);
      message.success("Login successful!");
      navigate(ROUTES.HOME || "/");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Invalid email or password",
      );
    }
  };

  return (
    <div
      style={{
        margin: "-24px -32px",
        overflow: "hidden",
        borderRadius: "12px",
      }}
    >
      <div style={{ display: "flex", minHeight: "550px" }}>
        {/* Left Side - Branding */}
        <div
          style={{
            flex: "0 0 45%",
            background:
              "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 50px",
            position: "relative",
            overflow: "hidden",
          }}
          className="hidden md:flex"
        >
          {/* Decorative circles */}
          <div
            style={{
              position: "absolute",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.1)",
              top: "-100px",
              right: "-100px",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.1)",
              bottom: "-50px",
              left: "-50px",
            }}
          />

          <div style={{ position: "relative", zIndex: 1, maxWidth: "320px" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "30px",
                backdropFilter: "blur(10px)",
              }}
            >
              <LockOutlined style={{ fontSize: "28px", color: "white" }} />
            </div>
            <h2
              style={{
                color: "white",
                fontSize: "32px",
                fontWeight: "700",
                marginBottom: "16px",
                lineHeight: "1.2",
              }}
            >
              Welcome Back!
            </h2>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "16px",
                lineHeight: "1.6",
              }}
            >
              Sign in to access your account and continue your journey with us.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div
          style={{
            flex: "1",
            padding: "60px 50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "white",
          }}
        >
          <div style={{ maxWidth: "400px", margin: "0 auto", width: "100%" }}>
            <h1
              style={{
                marginBottom: "8px",
                fontWeight: "700",
                fontSize: "28px",
                color: "#111827",
              }}
            >
              Sign In
            </h1>
            <p
              style={{
                color: "#6b7280",
                fontSize: "15px",
                marginBottom: "32px",
              }}
            >
              Enter your credentials to access your account
            </p>

            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: "#9ca3af" }} />}
                  placeholder="Enter your email"
                  size="large"
                  style={{
                    borderRadius: "8px",
                    padding: "12px 16px",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: "#9ca3af" }} />}
                  placeholder="Enter your password"
                  size="large"
                  style={{
                    borderRadius: "8px",
                    padding: "12px 16px",
                  }}
                />
              </Form.Item>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox style={{ fontSize: "14px" }}>Remember me</Checkbox>
                </Form.Item>
                <Link
                  to={ROUTES.FORGET_PASSWORD}
                  style={{
                    color: "#6366f1",
                    fontSize: "14px",
                    fontWeight: "500",
                    textDecoration: "none",
                  }}
                >
                  Forgot Password?
                </Link>
              </div>

              <Form.Item style={{ marginBottom: "16px" }}>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  style={{
                    height: "48px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    border: "none",
                  }}
                >
                  Log in
                </Button>
              </Form.Item>

              <div
                style={{
                  textAlign: "center",
                  color: "#6b7280",
                  fontSize: "14px",
                }}
              >
                Don't have an account?{" "}
                <Link
                  to={ROUTES.SIGNUP}
                  style={{
                    color: "#6366f1",
                    fontWeight: "600",
                    textDecoration: "none",
                  }}
                >
                  Sign up now
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
