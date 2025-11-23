import { Form } from "antd";
import React from "react";

export const useLoginPage = () => {
  const [form] = Form.useForm();
  return { form };
};
