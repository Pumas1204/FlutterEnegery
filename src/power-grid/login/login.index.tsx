"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form, Input, message as antdMessage } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./login.module.scss";
import { AuthLayoutComp } from "components";
import { useAsyncClick } from "scripts";
import { PATH } from "data";
import { authApi } from "../api/auth";

const LoginComp: React.FC = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = antdMessage.useMessage();

  const onFinish = useAsyncClick((values: any) => {
    return new Promise((resolve) => {
      authApi
        .login({
          username: values.username,
          password: values.password,
        })
        .then(() => {
          router.push(PATH.panel.path);
        })
        .catch((e) => {
          messageApi.error(
            e.message === "Login failed"
              ? "Your email or password is incorrect!, please try again."
              : "Something went wrong, please try again later.",
          );
        })
        .finally(() => resolve(true));
    });
  });

  return (
    <AuthLayoutComp
      title="Log in to your account"
      subtitle="Welcome back! Please enter your details."
    >
      {contextHolder}
      <div
        style={{
          textAlign: "center",
          marginBottom: "10px",
          fontSize: "12px",
          color: "#666",
        }}
      >
        Version: 1.0.0-beta
      </div>
      <Form onFinish={onFinish.onClick} layout="vertical">
        <Form.Item
          name="username"
          label="Email"
          rules={[
            { required: true, message: "Please input your Email!" },
            { type: "email", message: "The input is not valid E-mail!" },
          ]}
        >
          <Input
            placeholder="Enter your email"
            prefix={<MailOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            placeholder="Enter your email"
            prefix={
              <LockOutlined
                className="site-form-item-icon"
                placeholder="Enter your password"
                type="password"
              />
            }
          />
        </Form.Item>
        <div className={styles.forgotPassword}>
          <Link href="/forgot-password">Forgot password</Link>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-100"
            disabled={onFinish.loading}
            loading={onFinish.loading}
          >
            Sign In
          </Button>
        </Form.Item>

        <div className={styles.signUpLink}>
          Don&apos;t have an account? <Link href="/signup">Sign up</Link>
        </div>
      </Form>
    </AuthLayoutComp>
  );
};

export default LoginComp;
