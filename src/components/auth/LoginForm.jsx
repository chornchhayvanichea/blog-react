import React from "react";
import { ROUTES } from "../../constants/routes";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, message } from "antd";
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
    <>
      <h1 className="text-center mb-5 font-bold text-lg sm:text-xl">Login</h1>
      <div className="items-center justify-center flex">
        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your Email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to={ROUTES.FORGET_PASSWORD}>Forgot Password?</Link>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={loading}>
              Log in
            </Button>
            <div className="text-center mt-2">
              or <Link to={ROUTES.SIGNUP}>Sign up now!</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
