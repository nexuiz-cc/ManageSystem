import ADD from '../constants/list';
// state
const initState = ['aa', 'bb', 'cc'];
// eslint-disable-next-line default-param-last
const list = (state = initState, { type, payload }) => {
  switch (type) {
    case ADD:
      return [...state, payload];
    default:
      return state;
  }
};

export default list;
