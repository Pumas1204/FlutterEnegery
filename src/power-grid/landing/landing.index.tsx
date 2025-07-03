"use client";
import { Input } from "antd";
import styles from "./landing.module.scss";

export default function LandingComp() {
  return (
    <div className={`main-content w-100 ${styles["landing"]}`}>
      <div>
        <h1>Landing</h1>
        <Input />
      </div>
    </div>
  );
}
