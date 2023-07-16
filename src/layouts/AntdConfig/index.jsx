import './index.scss';
import React from 'react';

// 国际化
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

// eslint-disable-next-line react/prop-types
const AntdConfig = ({ children }) => (
  <ConfigProvider locale={zhCN}>{children}</ConfigProvider>
);

export default AntdConfig;
