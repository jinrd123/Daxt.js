import React from 'react';
import styles from './style.css';
import useStyles from 'isomorphic-style-loader/useStyles';

const NotFound = () => {
  useStyles(styles);
  return (
    <div className={styles.notFound}>
      <div className={styles.notFoundContent}>
        <h1>404</h1>
        <h2>页面未找到</h2>
        <p>抱歉，您访问的页面不存在。</p>
        <a href="/" className={styles.backHome}>返回首页</a>
      </div>
    </div>
  );
};

export default NotFound; 