//判断是否登录，判断身份，admin/user

import { useLocation, Navigate } from "react-router-dom";

export default function Auth({ children }) {
  let location = useLocation();

  if (location.pathname.includes("/login")) {
    return children;
  } else {
    //判断是否登录
    if (true) {
      return children;
    } else {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }
}
