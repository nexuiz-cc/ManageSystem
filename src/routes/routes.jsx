import React, { lazy } from 'react';
import { AppstoreAddOutlined } from '@ant-design/icons';

const Login = lazy(() => import('../pages/Login'));
const DashBoard = lazy(() => import('../pages/admin/DashBoard'));
const Notices = lazy(() => import('../pages/admin/Notices'));
const ProductList = lazy(() => import('../pages/admin/products/ProductList'));
const ProductEdit = lazy(() => import('../pages/admin/products/ProductEdit'));
const ReduxDemo = lazy(() => import('../pages/admin/ReducerDemo/ReduxDemo'));

// 默认路由
const defaultRoutes = [{ path: '/login', auth: false, element: <Login /> }];

// 管理员路由数据

const adminRoutes = [
  {
    path: 'admin/dashboard',
    element: <DashBoard />,
    disabled: false,
    icon: <AppstoreAddOutlined />,
    label: 'DashBoard',
  },
  {
    path: 'admin/notices',
    element: <Notices />,
    disabled: true,
    icon: <AppstoreAddOutlined />,
    label: 'Notice Center',
  },
  {
    path: 'admin/product-list',
    element: <ProductList />,
    disabled: false,
    icon: <AppstoreAddOutlined />,
    label: 'ProductList',
  },
  {
    path: 'admin/product-edit',
    element: <ProductEdit />,
    disabled: true,
    icon: <AppstoreAddOutlined />,
    label: 'New Product',
    children: [
      {
        path: ':id',
        element: <ProductEdit />,
        disabled: true,
        icon: <AppstoreAddOutlined />,
        label: 'ProductEdit',
      },
      {
        index: true, // 默认路由。实现id 为可选
        element: <ProductEdit />,
        disabled: true,
        icon: <AppstoreAddOutlined />,
        label: 'New Product',
      },
    ],
  },
  {
    path: 'admin/a',
    element: <ProductEdit />,
    disabled: false,
    icon: <AppstoreAddOutlined />,
    label: 'ProductEdit',
    children: [
      {
        path: 'a-1',
        element: <ProductEdit />,
        disabled: false,
        icon: <AppstoreAddOutlined />,
        label: 'New Product',
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
        label: 'New Product',
      },
      {
        path: 'b-2',
        element: <ProductEdit />,
        disabled: false,
        icon: <AppstoreAddOutlined />,
        label: 'New Product',
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
    path: 'admin/reduxDemo',
    element: <ReduxDemo />,
    disabled: false,
    icon: <AppstoreAddOutlined />,
    label: 'ReduxDemo',
  },
];

// 一般用户路由数据
const userRoutes = [];

export { defaultRoutes, adminRoutes, userRoutes };
