import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";

const Login = lazy(() => import("../pages/Login"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const BaseLayouts = lazy(() => import("../layouts/BaseLayouts"));
const DashBorad = lazy(() => import("../pages/admin/DashBoard"));
const ProductEdit = lazy(() => import("../pages/admin/products/ProductEdit"));
const ProductList = lazy(() => import("../pages/admin/products/ProductList"));
const Notices = lazy(() => import("../pages/admin/Notices"));

const RouterConfig = () => {
  let routes = [
    {
      path: "/",
      element: <BaseLayouts />,
      children: [
        { path: "admin/dashboard", element: <DashBorad /> },
        { path: "admin/notices", element: <Notices /> },
        { path: "admin/product-list", element: <ProductList /> },
        { path: "admin/product-list/:id", element: <ProductEdit /> },
        { index: true, element: <Navigate to="/admin/dashboard" /> },
        { path: "admin", element: <Navigate to="/admin/dashboard" /> },
        { path: "*", element: <PageNotFound /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "*", element: <PageNotFound /> },
  ];

  let Routes = () => useRoutes(routes);
  return (
    <BrowserRouter>
      <Suspense fallback={<>loading...</>}>
        {routes.length > 0 && <Routes />}
      </Suspense>
    </BrowserRouter>
  );
};

export default RouterConfig;
