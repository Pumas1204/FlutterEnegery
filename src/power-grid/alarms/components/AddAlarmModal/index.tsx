"use client";
import React from "react";
import {
  Modal,
  Button,
  Form,
  // Input,
  Select,
  // Space,
  InputNumber,
  message as antdMessage,
} from "antd";
import styles from "../../alarms.module.scss";
import useAsyncClick from "scripts/useAsyncClick";
import { LocalAlarmAPI } from "../../_lib/localAlarmApi";

const { Option } = Select;

interface AddAlarmModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void; // Callback to refresh the list after successful creation
}

interface FormData {
  field: string;
  condition: string;
  value: number | null;
}

// Map display values to API values
const conditionMap: { [key: string]: string } = {
  "=": "equals",
  ">=": "greater_than",
  "<=": "less_than",
  // Add other conditions if needed
};

const conditionLabelMap: { [key: string]: string } = {
  equals: "equals",
  greater_than: "reaches or exceeds",
  less_than: "is less than or equal to",
  // Add other conditions if needed
};

const AddAlarmModal: React.FC<AddAlarmModalProps> = ({
  visible,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm<FormData>();
  const [messageApi, contextHolder] = antdMessage.useMessage();

  const handleSave = useAsyncClick(async () => {
    const values = await form.validateFields();

    const apiCondition = conditionMap[values.condition];
    const conditionLabel = conditionLabelMap[apiCondition] || values.condition;
    const fieldLabel = values.field;
    const formattedValue = `$${values.value}`;

    const description = `Send me an email when the ${fieldLabel.toLowerCase()} ${conditionLabel} ${formattedValue}.`;

    // TODO: Replace with actual user ID from context/auth or pass as prop
    const currentUserId = 1;

    try {
      const payload = {
        description: description,
        status: "on" as "on" | "off",
        alarm_field: values.field.toLowerCase(),
        alarm_value: values.value?.toString() || "0",
        alarm_condition: apiCondition,
      };
      const response = await LocalAlarmAPI.createAlarm(currentUserId, payload);

      // Console log the response
      console.log("Create alarm response:", response);

      // Assuming BackendAPI throws an error for non-ok status based on LoginComp example
      messageApi.success("Alarm created successfully!");
      form.resetFields();
      onSuccess();
      return true; // Indicate success for useAsyncClick if needed
    } catch (error: any) {
      // Console log the error response as well
      console.log("Create alarm error:", error);

      // Extract error message if possible (assuming BackendAPI might format it)
      const errorMessage =
        error?.data?.detail || error?.message || "Failed to create alarm.";
      messageApi.error(`Error: ${errorMessage}`);
      // Let useAsyncClick handle the loading state end on error
      return false; // Indicate failure for useAsyncClick if needed
    }
    // No finally block needed, useAsyncClick handles loading state reset
  });

  return (
    <Modal
      title="Add New Alarm"
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnHidden
    >
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        initialValues={{ field: "Price", condition: ">=", value: 100 }}
      >
        <div className={styles.addAlarmFormRow}>
          <span className={styles.label}>When</span>
          <Form.Item
            name="field"
            style={{ width: "100%", marginBottom: "0px" }}
            rules={[{ required: true, message: "Please select a field" }]}
          >
            <Select>
              <Option value="Price">Price</Option>
              <Option value="Supply">Supply</Option>
              <Option value="Demand">Demand</Option>
              {/* Add other fields as needed */}
            </Select>
          </Form.Item>
          <span className={styles.label}>is</span>
          <Form.Item
            name="condition"
            style={{ width: "100%", marginBottom: "0px" }}
            rules={[{ required: true, message: "Please select a condition" }]}
          >
            <Select>
              <Option value=">=">{`>=`}</Option>
              <Option value="<=">{`<=`}</Option>
              <Option value="=">=</Option>
              {/* Add other conditions as needed */}
            </Select>
          </Form.Item>
          <Form.Item
            name="value"
            style={{ width: "100%", marginBottom: "0px" }}
            rules={[{ required: true, message: "Please enter a value" }]}
          >
            <InputNumber
              min={0}
              prefix="$"
              style={{ width: "100%" }} // Ensure input takes available space
              // Removed formatter/parser as InputNumber handles locale formatting often
              // Re-add if specific non-locale formatting is required
            />
          </Form.Item>
        </div>

        <div className={styles.modalFooter}>
          <Button key="back" onClick={onCancel} disabled={handleSave.loading}>
            Cancel
          </Button>
          <Button
            key="submit"
            className={styles.addAlarmButton}
            loading={handleSave.loading} // Use loading state from hook
            onClick={handleSave.onClick} // Use onClick from hook
          >
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddAlarmModal;
