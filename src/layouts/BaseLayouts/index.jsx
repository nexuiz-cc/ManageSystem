/* eslint-disable no-shadow */
/* eslint-disable no-tabs */
/* eslint-disable consistent-return */
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './index.scss';
import React, { useState } from 'react';
import { DownOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import {
  Breadcrumb, Col, Layout, Menu, Row, Dropdown, Space, Avatar, Button,
} from 'antd';
import { setToKen } from '../../utils/localStorage';
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

const rootSubmenuKeys = items.filter((item) => typeof item !== 'undefined').map((item) => item.key);

const BaseLayouts = (props) => {
  const [collapsed, setCollapsed] = useState(false); // 收起菜单状态
  const [marginLeft, setMarginLeft] = useState(210); // 收起菜单状态

  const [openKeys, setOpenKeys] = useState([]); // 当前展开的 SubMenu 菜单项 key 数组	string[]

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
          setToKen('');
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
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          top: 0,
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
            <Dropdown menu={menu}>
              <div><Button>Button</Button></div>
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
            background: 'lightgray',
          }}
        >
          <Breadcrumb
            className="Breadcrumb"
            items={[
              {
                title: <Link to="/admin/dashboard">DashBoard</Link>,
              },
              {
                title: <Link to="/admin/product-list">ProductList</Link>,
              },
            ]}
          />
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
          <Footer style={{ background: 'lightgray' }}>footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default BaseLayouts;
