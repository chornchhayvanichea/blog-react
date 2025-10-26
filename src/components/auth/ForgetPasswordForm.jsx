import React from "react";
import { ROUTES } from "../../constants/routes";
import { Link } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
const ForgetPasswordForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <>
      <h1 className="text-center mb-5 font-bold text-xl sm:text-xl">
        Forget Password
      </h1>
      <p className="text-center mb-4 text-[8px] font-semibold text-gray-400">
        Enter your email to send password reset link.
      </p>

      <div className="items-center justify-center flex">
        <Form
          name="forgetPassword"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Send
            </Button>
            Return to
            <Link to={ROUTES.SIGNUP}> Login page</Link>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default ForgetPasswordForm;
