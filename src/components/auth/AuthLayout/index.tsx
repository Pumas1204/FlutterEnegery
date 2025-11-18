"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import styles from "./AuthLayout.module.scss";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  showImage?: boolean; // Add prop to control image visibility
  imageOnRight?: boolean; // control whether image is on right side
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  showImage = true,
  imageOnRight = false,
}) => {
  // Default showImage to true
  return (
    <div
      dir="ltr"
      className={`${styles.authLayout} ${imageOnRight ? styles.imageRight : ""}`}
    >
      {showImage && ( // Conditionally render the image section
        <div className={styles.imageSection}>
          {/* Ensure the image path is correct and the image exists in the public folder */}
          <Image
            src="/image-login.jpg" // Placeholder path - adjust if needed
            alt="Auth background"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      )}
      {/* Adjust form section width based on image visibility */}
      <div
        className={`${styles.formSection} ${!showImage ? styles.fullWidth : ""}`}
      >
        <div className={styles.formContainer}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
