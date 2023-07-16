function getToken() {
  return localStorage.getItem("token");
}

function setToKen(token) {
  localStorage.setItem("token", token);
}

function clearToken() {
  localStorage.removeItem("token");
}

function isLogin() {
  if (getToken()) {
    return true;
  } else {
    return false;
  }
}

export { getToken, setToKen, clearToken, isLogin };
