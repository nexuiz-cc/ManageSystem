import './index.scss';
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button, Checkbox, Form, message,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import loginApi from '../../services/auth';
import { setToKen } from '../../utils/localStorage';

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async ({ userName, password }) => {
    // umi-request 请求、根据数据，写入token
    const res = await loginApi({ userName, password });
    if (res.code === 'success') {
      setToKen(res.token);
      navigate('/admin/dashboard');
    } else {
      message.info('登录失败，请重试');
    }
  };
  const register = () => {
    document.getElementById('register').style.display = 'block';
    document.getElementsByClassName('box')[0].style.height = '700px';
    document.getElementsByClassName('warpper')[0].style.height = '690px';
  };
  const onregister = () => {};

  const fixUser = () => {
    const username = document.getElementById('username');
    const userspan = document.getElementById('userspan');
    const usernameValue = username.value;
    if (usernameValue !== '') {
      userspan.classList.add('valUserSpan');
    }
  };

  const fixPass = () => {
    const passspan = document.getElementById('passspan');
    passspan.classList.add('valPassSpan');
  };

  return (
    <div className="box">
      <div className="warpper">
        <div className="warpper2">
          <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
            <h2>Login</h2>
            <Form.Item name="userName" rules={[{ required: true, message: 'Please input your Username!' }]}>
              <div className="inputbox">
                <input type="text" id="username" prefix={<UserOutlined className="site-form-item-icon" />} onClick={fixUser} />
                <span id="userspan">Username</span>
                <i />
              </div>
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
              <div className="inputbox">
                <input
                  prefix={<LockOutlined className="site-form-item-icon" id="password" />}
                  type="password"
                  onClick={fixUser}
                  onBlur={fixPass}
                />
                <span id="passspan">Password</span>
                <i />
              </div>
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="fff">Remember me</Checkbox>
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
                Forgot password or
                <div>
                  {' '}
                  <Button className="regbtn" onClick={register}>
                    register now!
                  </Button>
                </div>

              </div>

            </Form.Item>
          </Form>
          <Form
            className="u--slideDown register"
            id="register"
            name="normal_register"
            initialValues={{ remember: true }}
            onFinish={onregister}
          >
            <Form.Item
              name="reguser"
              rules={[
                { required: true, message: 'Please input your Username!' },
              ]}
            >
              <div className="inputbox">
                <input type="text" className="reguser" />
                <span>Username</span>
                <i />
              </div>
            </Form.Item>
            <Form.Item
              name="regpass"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <div className="inputbox">
                <input type="password" className="regpass" />
                <span>Password</span>
                <i />
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
