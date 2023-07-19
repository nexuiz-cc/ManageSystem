// state
// const state = 10;

// reducer
import { DECREMENT, INCREMENT } from '../constants/count';

// eslint-disable-next-line default-param-last
const count = (state = 10, { type, payload }) => {
  switch (type) {
    case INCREMENT:
      return state + payload;
    case DECREMENT:
      return state - payload;
    default:
      return state;
  }
};

export default count;
