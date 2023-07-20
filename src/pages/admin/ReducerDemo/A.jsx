import { connect } from 'react-redux';
import React from 'react';
import { decrement, increment } from '../../../store/actions/count';

// eslint-disable-next-line react/prop-types
const A = ({ count, dispatch }) => {
  return (
    <>
      <h3>Component A</h3>
      <div>{count}</div>
      <button type="button" onClick={() => dispatch(increment(2))}>+</button>
      <button type="button" onClick={() => dispatch(decrement(3))}>-</button>
    </>
  );
};
// 缓存当前组件接受的数据
export default connect((state) => ({ count: state.count }))(A);
