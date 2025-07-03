"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Table,
  Switch,
  Space,
  Tooltip,
  message as antdMessage,
  Popconfirm,
} from "antd";
import type { TableColumnsType } from "antd";
import {
  PlusOutlined,
  MoreOutlined,
  DeleteOutlined,
  EditOutlined,
  DownOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import styles from "./alarms.module.scss";
import AddAlarmModal from "./components/AddAlarmModal";
// import { BackendAPI } from "power-grid/api/backendApi";
import { LocalAlarmAPI } from "./_lib/localAlarmApi";

interface AlarmData {
  id: number;
  key: React.Key;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
  description: string;
  status: "on" | "off";
  alarm_field: string;
  alarm_value: string;
  alarm_condition: string;
  profile: number;
}

// Helper function to format date
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

export default function AlarmsComp() {
  const [alarms, setAlarms] = useState<AlarmData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [messageApi, contextHolder] = antdMessage.useMessage();
  const itemsPerPage = 8;

  // TODO: Replace with actual user ID from context/auth
  const currentUserId = 1;

  const fetchAlarms = useCallback(
    async (page = currentPage) => {
      setLoading(true);
      try {
        const params = `?page=${page}&page_size=${itemsPerPage}`;
        const response = await LocalAlarmAPI.getAlarms(currentUserId, params);

        // Add the 'key' property needed for the AntD Table
        const alarmsWithKeys = response.results.map((alarm: any) => ({
          ...alarm,
          key: alarm.id,
        }));

        setAlarms(alarmsWithKeys);
        setTotalItems(response.count);
      } catch (_error) {
        console.log(_error);
        messageApi.error("Failed to load alarms. Please try again later.");
        setAlarms([]); // Clear data on error
        setTotalItems(0);
      } finally {
        setLoading(false);
        setSelectedRowKeys([]); // Clear selection on fetch
      }
    },
    [currentPage, messageApi, itemsPerPage],
  );

  useEffect(() => {
    fetchAlarms(currentPage);
  }, [currentPage, fetchAlarms]);

  const handleToggle = async (id: number, checked: boolean) => {
    const newStatus = checked ? "on" : "off";
    const originalStatus = checked ? "off" : "on"; // Status before toggle

    // Optimistic UI update
    setAlarms((prev) =>
      prev.map((alarm) =>
        alarm.id === id ? { ...alarm, status: newStatus } : alarm,
      ),
    );

    // Optional: Add a temporary info message to confirm optimistic UI update
    messageApi.info(`Alarm ${id} status optimistically set to ${newStatus}`);

    try {
      await LocalAlarmAPI.updateAlarm(currentUserId, id, { status: newStatus });
      messageApi.success(
        `Alarm ${id} status updated to ${newStatus} successfully.`,
      );
    } catch (_error) {
      console.error(
        `Failed to update alarm ${id} status to ${newStatus}. Reverting UI.`,
        "Original Status:",
        originalStatus,
        "Error:",
        _error,
      );
      messageApi.error(`Failed to update alarm ${id} status.`);
      // Revert UI change on failure
      setAlarms((prev) =>
        prev.map((alarm) =>
          alarm.id === id ? { ...alarm, status: originalStatus } : alarm,
        ),
      );
    }
  };

  const handleDelete = async (id: number) => {
    const originalAlarms = [...alarms];
    const originalTotal = totalItems;

    // Optimistic UI update
    setAlarms((prev) => prev.filter((alarm) => alarm.id !== id));
    setSelectedRowKeys((prev) => prev.filter((key) => key !== id));
    setTotalItems((prev) => prev - 1); // Decrement total count optimistically

    try {
      await LocalAlarmAPI.deleteAlarm(currentUserId, id);
      messageApi.success("Alarm deleted successfully!");
      // Optional: If the deleted item was the last on the page, go to previous page or refetch current
      if (originalAlarms.length % itemsPerPage === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1); // Go to previous page if last item deleted
      } else if (currentPage > 1 && alarms.length === 0) {
        // Handle case where page might become empty after delete
        setCurrentPage(currentPage - 1);
      }
    } catch (_error) {
      console.log(_error);
      messageApi.error("Failed to delete alarm.");
      // Revert UI change on failure
      setAlarms(originalAlarms);
      setTotalItems(originalTotal);
    }
  };

  const handleEdit = (_id: number) => {
    console.log(_id);
    messageApi.info("Edit functionality not implemented yet.");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Fetching is handled by the useEffect hook watching currentPage
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSuccess = () => {
    setIsModalVisible(false);
    fetchAlarms(1); // Refresh list and go back to page 1 after adding
    setCurrentPage(1);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const columns: TableColumnsType<AlarmData> = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      className: styles.descriptionColumn,
    },
    {
      title: (
        <span className={styles.sorter}>
          Last Update <DownOutlined style={{ fontSize: "10px" }} />
        </span>
      ),
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text: string) => formatDate(text),
      sorter: (a, b) =>
        new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(),
      sortDirections: ["descend", "ascend"],
      className: styles.lastUpdateColumn,
      defaultSortOrder: "descend",
    },
    {
      title: "On/Off",
      dataIndex: "status",
      key: "status",
      render: (status: "on" | "off", record: AlarmData) => (
        <Switch
          checked={status === "on"}
          onChange={(checked) => handleToggle(record.id, checked)}
          size="small"
        />
      ),
      className: styles.statusColumn,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: AlarmData) => (
        <Space size="middle" className={styles.actions}>
          <Tooltip title="Edit">
            <EditOutlined onClick={() => handleEdit(record.id)} />
          </Tooltip>
          <Popconfirm
            title="Delete the alarm"
            description="Are you sure you want to delete this alarm?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Tooltip title="Delete">
              {/* Wrap icon in a span or button if direct click handling is needed elsewhere */}
              <DeleteOutlined style={{ cursor: "pointer" }} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
      className: styles.actionsColumn,
    },
  ];

  return (
    <div className={styles.alarmsContainer}>
      {contextHolder}
      <div className={styles.pageHeader}>
        <div className={styles.titleSubtitle}>
          <h1 className={styles.title}>Alarms</h1>
          <p className={styles.subtitle}>
            View your team's trades and transactions.
          </p>
        </div>
        <Button
          className={styles.addAlarmButton}
          icon={<PlusOutlined />}
          onClick={showModal}
        >
          Add Alarm
        </Button>
      </div>

      <div className={styles.alarmListContainer}>
        <div className={styles.listHeader}>
          <span className={styles.listTitle}>All alarms</span>
          <MoreOutlined style={{ cursor: "pointer" }} />
        </div>

        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={alarms}
          loading={loading}
          pagination={false}
          className={styles.alarmTable}
          rowClassName={styles.tableRow}
          rowKey="key" // Explicitly set row key
        />

        <div className={styles.paginationContainer}>
          <span className={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>
          <Space className={styles.buttons}>
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1 || loading}
            >
              Previous
            </Button>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages || loading}
            >
              Next
            </Button>
          </Space>
        </div>
      </div>

      <AddAlarmModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
