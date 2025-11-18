"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form, Input, message as antdMessage } from "antd";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import styles from "./signup.module.scss";
import { AuthLayoutComp } from "components";
import { useAsyncClick } from "scripts";
import { PATH } from "data";
import { authApi } from "../api/auth";
import Image from "next/image";

const SignupComp: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = antdMessage.useMessage();

  const onFinish = useAsyncClick((values: any) => {
    let first_name = "";
    let last_name = "";
    if (values.fullName) {
      const nameParts = values.fullName.trim().split(" ");
      first_name = nameParts[0] || "";
      last_name = nameParts.slice(1).join(" ") || "";
    }

    return new Promise((resolve) => {
      authApi
        .register({
          first_name,
          last_name,
          email: values.email,
          password: values.password,
        })
        .then(() => {
          router.push(PATH.panel.path);
        })
        .catch((e) => {
          messageApi.error(
            e.message === "Registration failed"
              ? "Registration failed. Please try again."
              : "Something went wrong, please try again later.",
          );
        })
        .finally(() => resolve(true));
    });
  });

  return (
    <>
      <Image 
        src="/main-logo.svg"
        alt="Main logo"
        style={{
          position: "fixed",
          top: 16,
          left: 16,
          width: 120,
          height: "auto",
          zIndex: 1500,
        }}
      />

      <AuthLayoutComp
        title="Create an account"
        subtitle="Welcome! Please enter your details."
        imageOnRight={true}
      >
        {contextHolder}
        <Form
          form={form}
          name="signup"
          onFinish={onFinish.onClick}
          layout="vertical"
          requiredMark={false}
          className={styles.signupForm}
        >
          <Form.Item
            name="fullName"
            label="Full name"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input
              name="fullName"
              placeholder="Enter your name"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your Email!" },
              { type: "email", message: "The input is not valid E-mail!" },
            ]}
          >
            <Input
              name="email"
              placeholder="Enter your email"
              prefix={<MailOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Phone number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input
              name="phoneNumber"
              placeholder="+1"
              prefix={<PhoneOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              name="password"
              placeholder="Enter your password"
              type="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-100"
              disabled={onFinish.loading}
              loading={onFinish.loading}
            >
              Create account
            </Button>
          </Form.Item>

          <div className={styles.signInLink}>
            Already have an account? <Link href="/login">Sign in</Link>
          </div>
        </Form>
      </AuthLayoutComp>
    </>
  );
};

export default SignupComp;
