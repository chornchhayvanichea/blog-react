import React from "react";
import { ROUTES } from "../../constants/routes";
import { Link, useNavigate } from "react-router-dom";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";

const ForgetPasswordForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      // Add your API call here
      // await forgotPasswordAPI(values.email);
      message.success("Password reset link sent to your email!");
      setTimeout(() => navigate(ROUTES.LOGIN), 2000);
    } catch (error) {
      message.error("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
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
      <div style={{ display: "flex", minHeight: "500px" }}>
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
              <MailOutlined style={{ fontSize: "28px", color: "white" }} />
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
              Reset Password
            </h2>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "16px",
                lineHeight: "1.6",
              }}
            >
              Don't worry! It happens. Enter your email and we'll send you a
              link to reset your password.
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
              Forgot Password?
            </h1>
            <p
              style={{
                color: "#6b7280",
                fontSize: "15px",
                marginBottom: "32px",
              }}
            >
              Enter your email address and we'll send you a password reset link
            </p>

            <Form name="forgetPassword" onFinish={onFinish} layout="vertical">
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined style={{ color: "#9ca3af" }} />}
                  placeholder="Enter your email"
                  size="large"
                  style={{
                    borderRadius: "8px",
                    padding: "12px 16px",
                  }}
                />
              </Form.Item>

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
                  Send Reset Link
                </Button>
              </Form.Item>

              <div
                style={{
                  textAlign: "center",
                  color: "#6b7280",
                  fontSize: "14px",
                }}
              >
                <Link
                  to={ROUTES.LOGIN}
                  style={{
                    color: "#6366f1",
                    fontWeight: "600",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <ArrowLeftOutlined style={{ fontSize: "12px" }} />
                  Back to Login
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
