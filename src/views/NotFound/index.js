import React from 'react';
import './style.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>页面未找到</h2>
        <p>抱歉，您访问的页面不存在。</p>
        <a href="/" className="back-home">返回首页</a>
      </div>
    </div>
  );
};

export default NotFound; 