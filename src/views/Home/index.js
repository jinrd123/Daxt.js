import React, { useEffect } from "react";
import Header from "../../components/Header";
import { connect } from "react-redux";
import { getHomeData } from "./store/actions";
import styles from "./style.css";
import useStyles from "isomorphic-style-loader/useStyles";

const Home = (props) => {
  useStyles(styles);
  useEffect(() => {
    const { getHomeData } = props;
    getHomeData();
  }, []);

  return (
    <div className={styles.test}>
      <Header />
      Hello，
      我是靳荣达，这是我的一款基于react生态的服务端渲染框架，名为Daxt.js，有好运之意，同时致敬Next.js这款优秀的开源框架
      <div>Daxt当前并不完善，但我认为也有如下的竞争力</div>
      <div>不错的开发体验</div>
      <ul>
        <li>
          支持热更，借助nodemon、webpack
          watch以及npm-run-all等工具链的组合实现热更新
        </li>
        <li>
          清晰的项目结构，components和views文件夹下，随心所欲的编写react代码，代码会自动被client以及server进行处理；Routes.js中使用配置对象的形式进行路由配置
        </li>
      </ul>
      <div>路由支持：</div>
      <ul>
        <li>集成了react-router-dom@6，支持react-router的最新特性</li>
        <li>重写useRoutes方法(getRoutes)，支持嵌套路由</li>
        <li>基于配置模式实现路由组件异步数据的ssr</li>
      </ul>
      <div>基于redux的状态管理支持</div>
      <div>对cssModule的样式服务端渲染支持</div>
      <div>基于react-helmet进行更细节的seo优化</div>
      {props.data}
    </div>
  );
};

Home.loadData = (store) => {
  return store.dispatch(getHomeData());
};

const mapStateToProps = (state) => ({
  data: state.home.data,
});

const mapDispatchToProps = (dispatch) => ({
  getHomeData() {
    dispatch(getHomeData());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
