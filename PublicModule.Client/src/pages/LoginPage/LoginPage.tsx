import React from "react";
import styles from "./LoginPage.module.scss";
import { Button, Form, Input } from "antd";
import { useLoginPage } from "./LoginPageHooks";

const LoginPage = () => {
  const { form } = useLoginPage();
  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <div className={styles.containerLogo}>
          <div className={styles.logo}>
            <img
              className="fb_logo _8ilh img"
              src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
              alt="Facebook"
            />
          </div>
          <h2 className="title">
            FacebookFacebook giúp bạn kết nối và chia sẻ với mọi người trong
            cuộc sống của bạn.
          </h2>
        </div>
        <div className={styles.loginForm}>
          <Form
            form={form}
            name="loginForm"
            onFinish={() => {}}
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập Email!" }]}
            >
              <Input
                placeholder="Nhập Email của bạn "
                className={styles.input}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập Mật khẩu!" }]}
            >
              <Input.Password placeholder="Mật khẩu" className={styles.input} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Đăng nhập
              </Button>
            </Form.Item>
            <Button type="link" href="/login">
              Quên mật khẩu?
            </Button>
            <div className={styles.line}></div>
            <Button
              className={styles.createAccount}
              type="link"
              href="/register"
            >
              Tạo tài khoản mới
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
