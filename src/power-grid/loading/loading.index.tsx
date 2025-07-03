"use client";
import { Spin } from "antd";
import styles from "./loading.module.scss";

export default function LoadingComp() {
  return (
    <div className={`${styles.loading} min-h-100-vh center-content`}>
      <Spin size="large" />
      <p className="t-p2 t-l-gray2 t-d-white mt-2 text-center">Loading ...</p>
    </div>
  );
}
