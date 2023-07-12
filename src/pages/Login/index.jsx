import React from "react";
import { Form, Button, Checkbox } from "antd";
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
    document.getElementById("register").style.display = "block";
    document.getElementsByClassName("box")[0].style.height = "700px";
    document.getElementsByClassName("warpper")[0].style.height = "690px";
  };

  const onregister = ()=>{

  }

  return (
    <div className="box">
      <div className="warpper">
        <div className="warpper2">
          <Form  name="normal_login"  className="login-form" 
              initialValues={{ remember: true,}} onFinish={onFinish}>
                <h2>Login</h2>
            <Form.Item name="username"  rules={[{   required: true,   message: "Please input your Username!", }, ]} >
              <div className="inputbox">
                <input  type='text'  prefix={<UserOutlined className="site-form-item-icon" />} />
                <span>Username</span>
                <i></i>
              </div>
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!",}, ]} >   
              <div className="inputbox">
                <input  prefix={<LockOutlined className="site-form-item-icon" />} type="password" />
                <span>Password</span>
                <i></i>
              </div> 
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
          <Form className="u--slideDown register" id="register" name="normal_register"  initialValues={{ remember: true,}} onFinish={onregister}>
            <Form.Item name="reguser"   rules={[{ required: true, message: "Please input your Username!",  },]}>
              <div className="inputbox">
                <input   type="text"  className="reguser"/>
                <span>Username</span>
                <i></i>
              </div> 
            </Form.Item>
            <Form.Item  name="regpass" rules={[{ required: true, message: "Please input your Password!",}, ]} >
              <div className="inputbox">
                <input  type="password"  className="regpass"/>
                <span>Password</span>
                <i></i>
              </div> 
            </Form.Item>
            <Form.Item>
              <Button type="primary" className="registerbtn">
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
