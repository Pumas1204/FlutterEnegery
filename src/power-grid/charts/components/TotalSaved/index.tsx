"use client";
import { DollarOutlined } from "@ant-design/icons"; // Or a more fitting icon
import styles from "../../charts.module.scss";

interface TotalSavedProps {
  amount: string;
  label: string;
}

const TotalSaved: React.FC<TotalSavedProps> = ({ amount, label }) => {
  return (
    <div className={styles.totalSavedContainer}>
      <div className={styles.iconWrapper}>
        {/* Replace with a more specific icon if available or needed */}
        <DollarOutlined style={{ fontSize: "28px" }} />
      </div>
      <div>
        <div className={styles.label}>{label}</div>
        <div className={styles.amount}>${amount}</div>
      </div>
    </div>
  );
};

export default TotalSaved;
