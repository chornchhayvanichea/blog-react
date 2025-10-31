// src/components/PostForm.jsx
import React, { useState } from "react";
import {
  Input,
  Button,
  Select,
  Space,
  Divider,
  Upload,
  message,
  Row,
  Col,
  Card,
} from "antd";
import {
  UploadOutlined,
  PictureOutlined,
  FolderOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

export default function PostForm({ onPublish, onSaveDraft }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("technology");
  const [fileList, setFileList] = useState([]);

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
        return false;
      }
      setFileList([file]);
      return false;
    },
    fileList,
    onRemove: () => {
      setFileList([]);
    },
    maxCount: 1,
  };

  const handlePublish = () => {
    if (!title || !content) {
      message.error("Please add a title and content");
      return;
    }
    onPublish({ title, content, category, fileList });
  };

  const handleSaveDraft = () => {
    onSaveDraft({ title, content, category, fileList });
  };

  return (
    <>
      {/* Editor Area */}
      <Card
        style={{
          borderRadius: 8,
          marginBottom: 24,
        }}
      >
        <Input
          placeholder="Enter your title here..."
          bordered={false}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            fontSize: 40,
            fontWeight: 700,
            padding: "10px 0",
            marginBottom: 20,
            lineHeight: 1.3,
          }}
        />

        <Divider style={{ margin: "20px 0" }} />

        <TextArea
          placeholder="Tell your story..."
          bordered={false}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          autoSize={{ minRows: 20 }}
          style={{
            fontSize: 18,
            lineHeight: 1.8,
            padding: 0,
            resize: "none",
            color: "#333",
          }}
        />
      </Card>

      {/* Settings Section */}
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Card
            bordered={false}
            title={
              <Space>
                <FolderOutlined style={{ color: "#1890ff" }} />
                <span>Category</span>
              </Space>
            }
            style={{ borderRadius: 8 }}
          >
            <Select
              value={category}
              onChange={setCategory}
              style={{ width: "100%" }}
              size="large"
            >
              <Select.Option value="technology">Technology</Select.Option>
              <Select.Option value="lifestyle">Lifestyle</Select.Option>
              <Select.Option value="travel">Travel</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="business">Business</Select.Option>
              <Select.Option value="health">Health</Select.Option>
            </Select>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            bordered={false}
            title={
              <Space>
                <PictureOutlined style={{ color: "#1890ff" }} />
                <span>Featured Image</span>
              </Space>
            }
            style={{ borderRadius: 8 }}
          >
            <Upload {...uploadProps} listType="picture">
              <Button
                icon={<UploadOutlined />}
                size="large"
                block
                style={{ height: 40 }}
              >
                Choose Image
              </Button>
            </Upload>
          </Card>
        </Col>
      </Row>

      {/* Action Buttons */}
      <Space
        size="middle"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 24,
        }}
      >
        <Button size="large" onClick={handleSaveDraft}>
          Save Draft
        </Button>
        <Button type="primary" size="large" onClick={handlePublish}>
          Publish
        </Button>
      </Space>
    </>
  );
}
