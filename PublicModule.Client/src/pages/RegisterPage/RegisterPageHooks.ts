import { Form } from "antd";
import React from "react";

export const useRegisterPage = () => {
  const [form] = Form.useForm();
  const registerUser = async () => {
    try {
      const response = await fetch("https://localhost:5229/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.getFieldValue("name"),
          email: form.getFieldValue("email"),
          password: form.getFieldValue("password"),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Thành công:", data.message);
      } else {
        console.error("Lỗi:", data);
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
    }
  };

  return { form, registerUser };
};
