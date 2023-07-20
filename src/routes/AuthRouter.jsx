// 判断是否登录，判断身份，admin/user
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle

// eslint-disable-next-line react/prop-types
const AuthRouter = ({ children, auth }) => {
  // eslint-disable-next-line consistent-return
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  }, []);
  return children;
};

export default AuthRouter;
