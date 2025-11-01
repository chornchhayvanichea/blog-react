// src/components/PostForm.jsx
import React, { useEffect, useState } from "react";
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

export default function PostForm({
  initialValues = null,
  onPublish,
  onSaveDraft,
  loading,
  categories = [],
  loadingCategories = false,
  isEditing = false,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [fileList, setFileList] = useState([]);

  // Load initial values when editing
  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title || "");
      setContent(initialValues.content || "");
      setCategoryId(initialValues.category_id || null);

      // If there's an existing image, add it to fileList for preview
      if (initialValues.image) {
        setFileList([
          {
            uid: "-1",
            name: "Current Image",
            status: "done",
            url: initialValues.image,
          },
        ]);
      }
    }
  }, [initialValues]);

  // Set default category when categories load (only for new posts)
  useEffect(() => {
    if (categories.length > 0 && !categoryId && !isEditing) {
      setCategoryId(categories[0].category_id);
    }
  }, [categories, categoryId, isEditing]);

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
        return false;
      }
      // Store the actual File object for new uploads
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

    // Only pass new file uploads (File objects), not existing images
    const newFiles = fileList.filter((file) => file instanceof File);

    onPublish({
      title,
      content,
      category_id: categoryId,
      fileList: newFiles,
    });
  };

  const handleSaveDraft = () => {
    // Only pass new file uploads (File objects), not existing images
    const newFiles = fileList.filter((file) => file instanceof File);

    onSaveDraft({
      title,
      content,
      category_id: categoryId,
      fileList: newFiles,
    });
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
              value={categoryId}
              onChange={setCategoryId}
              style={{ width: "100%" }}
              size="large"
              loading={loadingCategories}
              placeholder="Select a category"
            >
              {categories.map((cat) => (
                <Select.Option key={cat.category_id} value={cat.category_id}>
                  {cat.category_name}
                </Select.Option>
              ))}
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
                {isEditing && initialValues?.image
                  ? "Change Image"
                  : "Choose Image"}
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
        <Button size="large" onClick={handleSaveDraft} loading={loading}>
          {isEditing ? "Update Draft" : "Save Draft"}
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={handlePublish}
          loading={loading}
        >
          {isEditing ? "Update & Publish" : "Publish"}
        </Button>
      </Space>
    </>
  );
}
