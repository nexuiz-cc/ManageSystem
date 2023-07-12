import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    if (values.username === "admin" && values.password === "admin") {
      navigate("/admin/dashborad");
    } else {
      navigate("/login");
    }
  };
  const register = () => {
    document.getElementById("register").style.display = "flex";
    document.getElementsByClassName("box")[0].style.height = "600px";
    document.getElementsByClassName("warpper")[0].style.height = "590px";
  };

  return (
    <div className="box">
      <div className="warpper">
        <div className="warpper2">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <div className="inputbox">
                <Input prefix={<UserOutlined className="site-form-item-icon" />}  />
                <span>Username</span>
              </div>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="fff">Remember me</Checkbox>
              </Form.Item>

              <p className="fff">Forgot password</p>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              <div className="registerNow fff">
                Or
                <Button className="regbtn" onClick={register}>
                  register now!
                </Button>
              </div>
            </Form.Item>
          </Form>
          <Form className="u--slideDown" id="register">
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                className="reguser"
              />
            </Form.Item>
            <Form.Item
              id="errmsgPassword"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                className="regpass"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="registerbtn">
                register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
