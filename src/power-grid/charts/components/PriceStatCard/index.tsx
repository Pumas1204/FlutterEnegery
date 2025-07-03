"use client";
import styles from "../../charts.module.scss";

interface PriceStatCardProps {
  title: string;
  value: string;
  unit?: string;
  timeLabel?: string; // Can be time ('at x EST') or period ('March', 'month-to-date')
}

const PriceStatCard: React.FC<PriceStatCardProps> = ({
  title,
  value,
  unit = "/ MWh", // Default unit from image
  timeLabel,
}) => {
  return (
    <div className={styles.statsCardAdapted}>
      {" "}
      {/* Use adapted styles */}
      <h3>{title}</h3>
      <div className={styles.valueUnitContainer}>
        <span className={styles.value}>{value}</span>
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>
      {timeLabel && <div className={styles.timeLabel}>{timeLabel}</div>}
    </div>
  );
};

export default PriceStatCard;
