// state
// const state = 10;

// reducer
import { DECREMENT, INCREMENT, PUBLICFUNC } from '../constants/count';

// eslint-disable-next-line default-param-last
const count = (state = 10, { type, payload }) => {
  switch (type) {
    case INCREMENT:
      return state + payload;
    case DECREMENT:
      return state - payload;
    case PUBLICFUNC:
      alert('PUBLICFUNC');
      return state;
    default:
      return state;
  }
};

export default count;
