import React from "react";
import { Form } from "antd";

export const useLoginPage = () => {
  const [form] = Form.useForm();
  return { form };
};
