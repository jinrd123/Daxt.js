import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

// Antd主题配置
export const antdTheme = {
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 6,
  },
};

// 创建Antd配置提供者组件
export const AntdConfigProvider = ({ children }) => {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={antdTheme}
    >
      {children}
    </ConfigProvider>
  );
}; 