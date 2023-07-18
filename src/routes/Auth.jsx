// 判断是否登录，判断身份，admin/user
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Auth = ({ children }) => {
  const location = useLocation();
  const isLogin = false;
  if (location.pathname.includes('/login')) {
    return children;
  }
  // 判断是否登录
  if (isLogin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default Auth;
