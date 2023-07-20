import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom';
import Auth from './Auth';

// 假路由数据
import { adminRoutes, defaultRoutes } from './routes';

const PageNotFound = lazy(() => import('../pages/PageNotFound'));
const BaseLayouts = lazy(() => import('../layouts/BaseLayouts'));

const RouterConfig = (props) => {
  // 路由结构
  const routes = [
    {
      path: '/',
      element: <BaseLayouts />,
      children: [
        ...adminRoutes,
        { path: '/admin/dashboard', element: <Navigate to="/admin/dashboard" /> },
        { index: true, element: <Navigate to="/admin/dashboard" /> },
        { path: '*', element: <PageNotFound /> },
      ],
    },
    ...defaultRoutes,
    { path: '*', element: <PageNotFound /> },
  ];

  const Routes = () => useRoutes(routes);

  return (
    <BrowserRouter>
      <Auth>
        <Suspense fallback={<>loading....</>}>
          {routes.length > 0 && <Routes />}
        </Suspense>
      </Auth>
    </BrowserRouter>
  );
};

export default RouterConfig;
