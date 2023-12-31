/* eslint-disable no-shadow */
/* eslint-disable no-tabs */
/* eslint-disable consistent-return */
import { Outlet, useNavigate } from 'react-router-dom';
import './index.scss';
import { DownOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';

import {
  Breadcrumb,
  Col,
  Layout,
  Menu,
  Badge,
  Row,
  Dropdown,
  Space,
  Avatar,
} from 'antd';
import React, { useState, useEffect } from 'react';
import pubsub from 'pubsub-js';
import { adminRoutes } from '../../routes/routes';

const {
  Header, Content, Sider, Footer,
} = Layout;

// 生成一条菜单结构
function getItem({
  label, key, icon, children, disabled,
}) {
  if (!disabled) {
    return {
      key, // 对应path
      icon,
      children,
      label,
      disabled,
    };
  }
}
const getRoutes = (arr) => arr.map(({
  label, path, icon, disabled, children,
}) => getItem({
  label,
  key: path,
  icon,
  disabled,
  children: children && getRoutes(children),
}));
// 菜单数据	ItemType[]
const items = getRoutes(adminRoutes);
// const items = [
//   getItem("Navigation One", "sub1", <MailOutlined />, [
//     getItem("Option 1", "1"),
//     getItem("Option 2", "2"),
//     getItem("Option 3", "3"),
//     getItem("Option 4", "4"),
//   ]),
//   getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
//     getItem("Option 5", "5"),
//     getItem("Option 6", "6"),
//     getItem("Submenu", "sub3", null, [
//       getItem("Option 7", "7"),
//       getItem("Option 8", "8"),
//     ]),
//   ]),
//   getItem("Navigation Three", "sub4", <SettingOutlined />, [
//     getItem("Option 9", "9"),
//     getItem("Option 10", "10"),
//     getItem("Option 11", "11"),
//     getItem("Option 12", "12"),
//   ]),
// ];

// 生成根部菜单的keys数据

// const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
const rootSubmenuKeys = items
  .filter((item) => typeof item !== 'undefined')
  .map((item) => item.key);
// const rootSubmenuKeys = ["admin/xxx", "sub2", "sub4"];

const BaseLayouts = (props) => {
  const [collapsed, setCollapsed] = useState(false); // 收起菜单状态
  const [marginLeft, setMarginLeft] = useState(210); // 收起菜单状态

  const [openKeys, setOpenKeys] = useState([]); // 当前展开的 SubMenu 菜单项 key 数组	string[]

  const [noticesCount, setNoticesCount] = useState(0);

  useEffect(() => {
    // 读取未读数据
    setNoticesCount(4);

    // 订阅
    pubsub.subscribe('is-has-notices', (msg, data) => setNoticesCount(data));
  }, []);
  const navigate = useNavigate();
  // 控制一次展开一个菜单
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  // 跳转
  const onMenuSelect = ({ keyPath }) => {
    // console.log(keyPath); //['b-2-2', 'b-2', 'admin/b'] => /admin/b/b-2/b-2-2
    // console.log("/" + keyPath.reverse().join("/"));
    navigate(`/${keyPath.reverse().join('/')}`);
  };
  const menu = (
    <Menu
      items={[
        {
          key: 'admin/notices',
          label: '通知中心',
          icon: <SmileOutlined />,
        },
        {
          key: 'login',
          danger: true,
          label: '退出登录',
          icon: <SmileOutlined />,
        },
      ]}
      onClick={({ key, keyPath }) => {
        if (key === 'login') {
          // 清除token
        }
        onMenuSelect({ keyPath });
      }}
    />
  );

  return (
    <Layout style={{ paddingTop: 74 }}>
      <Header
        className="header"
        style={{
          position: 'fixed', zIndex: 1, width: '100%', top: 0,
        }}
      >
        <Row>
          <Col flex={10}>
            <img
              className="logo"
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            />
          </Col>
          <Col>
            <Dropdown overlay={menu}>
              <a href="#user" onClick={(e) => e.preventDefault()}>
                <Space>
                  <Badge count={noticesCount}>
                    <Avatar
                      style={{
                        backgroundColor: '#1da57a',
                      }}
                      icon={<UserOutlined />}
                    />
                  </Badge>
                  <span style={{ color: '#fff' }}>管理员</span>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <Layout style={{ marginLeft }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(collapsed) => {
            collapsed ? setMarginLeft(80 + 10) : setMarginLeft(200 + 10);
            setCollapsed(collapsed);
          }}
          width={200}
          collapsedWidth={80}
          breakpoint="md"
          className="site-layout-background"
          style={{
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 74,
          }}
        >
          <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            items={items}
            onSelect={onMenuSelect}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
          <Footer>footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default BaseLayouts;
