import React, { lazy } from 'react';
import { AppstoreAddOutlined } from '@ant-design/icons';

const Login = lazy(() => import('../pages/Login'));
const DashBoard = lazy(() => import('../pages/admin/DashBoard'));
const Notices = lazy(() => import('../pages/admin/Notices'));
const ProductList = lazy(() => import('../pages/admin/products/ProductList'));
const ProductEdit = lazy(() => import('../pages/admin/products/ProductEdit'));
const ReduxDemo = lazy(() => import('../pages/admin/ReducerDemo/ReduxDemo'));

// 默认路由
const defaultRoutes = [{ path: '/login', element: <Login /> }];

// 管理员路由数据

const adminRoutes = [
  {
    path: 'admin/dashboard',
    element: <DashBoard />,
    disabled: false,
    icon: <AppstoreAddOutlined />,
    label: '仪表盘',
  },
  {
    path: 'admin/notices',
    element: <Notices />,
    disabled: true,
    icon: <AppstoreAddOutlined />,
    label: '通知中心',
  },
  {
    path: 'admin/product-list',
    element: <ProductList />,
    disabled: false,
    icon: <AppstoreAddOutlined />,
    label: '商品列表',
  },
  {
    path: 'admin/product-edit',
    element: <ProductEdit />,
    disabled: true,
    icon: <AppstoreAddOutlined />,
    label: '商品新增',
    children: [
      {
        path: ':id',
        element: <ProductEdit />,
        disabled: true,
        icon: <AppstoreAddOutlined />,
        label: '商品编辑',
      },
      {
        index: true, // 默认路由。实现id 为可选
        element: <ProductEdit />,
        disabled: true,
        icon: <AppstoreAddOutlined />,
        label: '商品新增',
      },
    ],
  },
  {
    path: 'admin/a',
    element: <ProductEdit />,
    disabled: false,
    icon: <AppstoreAddOutlined />,
    label: 'a',
    children: [
      {
        path: 'a-1',
        element: <ProductEdit />,
        disabled: false,
        icon: <AppstoreAddOutlined />,
        label: 'a-1',
      },
    ],
  },
  {
    path: 'admin/b',
    element: <ProductEdit />,
    disabled: false,
    icon: <AppstoreAddOutlined />,
    label: 'b',
    children: [
      {
        path: 'b-1',
        element: <ProductEdit />,
        disabled: false,
        icon: <AppstoreAddOutlined />,
        label: 'b-1',
      },
      {
        path: 'b-2',
        element: <ProductEdit />,
        disabled: false,
        icon: <AppstoreAddOutlined />,
        label: 'b-2',
        children: [
          {
            path: 'b-2-1',
            element: <ProductEdit />,
            disabled: false,
            icon: <AppstoreAddOutlined />,
            label: 'b-2-1',
          },
          {
            path: 'b-2-2',
            element: <ProductEdit />,
            disabled: false,
            icon: <AppstoreAddOutlined />,
            label: 'b-2-2',
          },
        ],
      },
      {
        path: 'b-3',
        element: <ProductEdit />,
        disabled: false,
        icon: <AppstoreAddOutlined />,
        label: 'b-3',
      },
    ],
  },
  {
    path: 'admin/c',
    element: <ReduxDemo />,
    disabled: false,
    icon: <AppstoreAddOutlined />,
    label: 'c',
  },
];

// 一般用户路由数据
const userRoutes = [];

export { defaultRoutes, adminRoutes, userRoutes };
