import React, { useState } from "react";
import { Modal, Input, message } from "antd";
import { actionService } from "../../services/actionsService";
const { TextArea } = Input;

const ReportModal = ({ visible, onClose, postId, type = "post" }) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (!reason.trim()) {
      message.warning("Please provide a reason for reporting");
      return;
    }

    console.log("🔥 TYPE:", type);
    console.log("🔥 POST ID:", postId);
    console.log("🔥 REASON:", reason);

    try {
      setLoading(true);
      await actionService.createReport(type, postId, reason);
      message.success("Report submitted successfully");
      setReason("");
      onClose();
    } catch (error) {
      console.log("🔥 FULL ERROR:", error);
      console.log("🔥 ERROR RESPONSE:", error.response);
      console.log("🔥 ERROR DATA:", error.response?.data);
      message.error("Failed to submit report");
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    setReason("");
    onClose();
  };

  return (
    <Modal
      title="Report Content"
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText="Submit Report"
      cancelText="Cancel"
      confirmLoading={loading}
    >
      <div style={{ marginBottom: 16 }}>
        <p>Please provide a reason for reporting this content:</p>
        <TextArea
          rows={4}
          placeholder="Describe why you're reporting this content..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          maxLength={500}
          showCount
        />
      </div>
    </Modal>
  );
};

export default ReportModal;
