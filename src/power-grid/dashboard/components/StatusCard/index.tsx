"use client";
import { MoreOutlined } from "@ant-design/icons";
import clsx from "clsx";
import styles from "../../dashboard.module.scss";

interface Option {
  label: string;
  active: boolean;
  icon: React.ReactNode;
}

interface StatusCardProps {
  title: string;
  options: Option[];
}

const StatusCard: React.FC<StatusCardProps> = ({ title, options }) => {
  return (
    <div className={styles.card}>
      <h3>
        {title}
        <MoreOutlined />
      </h3>
      <div className={styles.optionsContainer}>
        {options.map((option, index) => (
          <div
            key={index}
            className={clsx(
              styles.option,
              option.active ? styles.active : styles.inactive,
            )}
          >
            {option.icon}
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusCard;
