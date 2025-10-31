import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="default" onClick={() => navigate("/")}>
            Back Home
          </Button>
        }
        style={{
          padding: "24px",
          borderRadius: "12px",
          background: "#fff",
          //  boxShadow: "0 2px 8px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)",
        }}
      />
    </div>
  );
};

export default ErrorPage;
