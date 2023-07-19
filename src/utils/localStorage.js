function getToken() {
  return localStorage.getItem('token');
}

function setToKen(token) {
  localStorage.setItem('token', token);
}

function clearToken() {
  localStorage.removeItem('token');
}

function isLogin() {
  let Login = false;
  if (getToken()) {
    Login = true;
    return Login;
  }
  return isLogin;
}

export {
  getToken, setToKen, clearToken, isLogin,
};
