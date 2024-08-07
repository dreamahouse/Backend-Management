import { Button, Card, Form, Input, message } from "antd";
import React from "react";
import { getToken } from "../../api";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = (val) => {
    if (!val.username || !val.password) {
      return message.open({
        type: "warning",
        content: "请输入账号和密码",
      });
    } else {
      getToken(val).then((res) => {
        localStorage.setItem("token", res.data.data);
        navigate("/home");
      });
    }
  };
  return (
    <Card
      hoverable
      style={{
        width: "350px",
        textAlign: "center",
        margin: "20% auto",
      }}
    >
      <Form onFinish={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>系统登录</div>
        <Form.Item label="账号" name="username">
          <Input placeholder="请输入账号" />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            登录
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
