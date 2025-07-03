"use client";
import { MoreOutlined } from "@ant-design/icons";
import styles from "../../dashboard.module.scss";

interface StatsCardProps {
  title: string;
  value: string;
  unit?: string;
  time?: string;
  timeLabel?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, time }) => {
  return (
    <div className={styles.card}>
      <h3>
        {title}
        <MoreOutlined />
      </h3>
      <div className={styles.statsValue}>{value}</div>
      {time && <div className={styles.statsTime}>{time}</div>}
    </div>
  );
};

export default StatsCard;
