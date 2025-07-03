import React from "react";
import { Input, Form } from "antd";
import { FormItemProps } from "antd/lib/form";
import styles from "./FormInput.module.scss";

interface FormInputProps extends FormItemProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  prefix?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  rules,
  ...rest
}) => {
  const InputComponent = type === "password" ? Input.Password : Input;

  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      className={styles.formItem}
      {...rest}
    >
      <InputComponent
        placeholder={placeholder}
        className={styles.input}
        size="large"
      />
    </Form.Item>
  );
};

export default FormInput;
