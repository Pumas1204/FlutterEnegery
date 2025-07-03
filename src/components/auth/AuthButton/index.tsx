import React from "react";
import { Button } from "antd";
import { ButtonProps } from "antd/lib/button";
import styles from "./AuthButton.module.scss";

interface AuthButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  children,
  type = "primary",
  htmlType = "submit",
  size = "large",
  ...rest
}) => {
  return (
    <Button
      type={type}
      htmlType={htmlType}
      className={styles.authButton}
      size={size}
      block // Make button full width
      {...rest}
    >
      {children}
    </Button>
  );
};

export default AuthButton;
