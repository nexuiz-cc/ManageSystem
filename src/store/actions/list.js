import { ADD, PUBLICFUNC } from '../constants/list';

// 提取 actions 封装成函数，返回actions
export const add = (payload) => ({ type: ADD, payload });
export const publicFunc = (payload) => ({ type: PUBLICFUNC, payload });

export const asyncAdd = () => (dispatch) => {
  // dispatch调用的函数
  console.log('dispatch调用的函数');
  // 异步的代码
  setTimeout(() => {
    // 结果回来了，这个函数把结果发给reducer
    dispatch({ type: ADD, payload: '读到的数据' });
  }, 2000);
};
