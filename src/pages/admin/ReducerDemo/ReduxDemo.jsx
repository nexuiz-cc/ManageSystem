import { connect } from 'react-redux';
import React from 'react';
import A from './A';
import { add, asyncAdd } from '../../../store/actions/list';

// eslint-disable-next-line react/prop-types
const ReduxDemo = ({ list, dispatch }) => {
  return (
    <>
      <h3>ReduxDemo</h3>
      <div>{list}</div>
      <button type="button" onClick={() => dispatch(add('ddd'))}>增</button>
      <button type="button" onClick={() => dispatch(asyncAdd())}>异步增</button>
      <A />
    </>
  );
};

export default connect((state) => ({ list: state.list }))(ReduxDemo);
