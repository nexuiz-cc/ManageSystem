import instance from '../utils/request';

const loginApi = (user) => {
  return instance.post('/api/v1/auth/manager_login', {
    data: user,
  });
};
export default loginApi;
