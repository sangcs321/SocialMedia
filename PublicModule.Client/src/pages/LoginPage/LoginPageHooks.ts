import React from "react";
import { Form } from "antd";
import { AuthApiService } from "api/Service/AuthApiService";
import { useNavigate } from "react-router-dom";

export const useLoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const email = form.getFieldValue("email");
      const password = form.getFieldValue("password");
      const loginRes = await AuthApiService.login(email, password);
      if (loginRes.success) {
        navigate("/");
      } 
    } catch (error) {
      console.error(error);
    }
  };
  return { form, handleLogin };
};
