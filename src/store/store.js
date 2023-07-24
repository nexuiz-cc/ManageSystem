/* eslint-disable object-curly-newline */
// 配置redux
// eslint-disable-next-line import/no-extraneous-dependencies
import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import thunk from 'redux-thunk';
// reducer
import count from './reducers/count';
import tableData from './reducers/tabledata';
import list from './reducers/list';

// 合并小的reducer
const rootReducer = combineReducers({ count, list, tableData });

// 实例化一个store实例
// const store = createStore(reducer, state,中间件);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store; // 谁用谁引入
