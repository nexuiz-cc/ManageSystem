import { DECREMENT, INCREMENT, NEW } from '../constants/count';

// 提取 actions 封装成函数，返回actions
export const increment = (payload = 1) => ({ type: INCREMENT, payload: 1 });
export const decrement = (payload = 1) => ({ type: DECREMENT, payload: 1 });
export const newData = (name, address, country, tel) => ({
  type: NEW, name, address, country, tel,
});
