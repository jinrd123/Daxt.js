import React, { Fragment, useEffect } from "react";
import Header from "../../components/Header";
import { connect } from "react-redux";
import { getHomeData } from "./store/actions";
import styles from "./style.css";
import useStyles from "isomorphic-style-loader/useStyles";
import { Helmet } from "react-helmet";
import { Button, Card, Space, Typography, Divider, List } from "antd";
import { RocketOutlined, HeartOutlined, StarOutlined, CheckCircleOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const Home = (props) => {
  useStyles(styles);
  useEffect(() => {
    const { getHomeData } = props;
    getHomeData();
  }, []);

  // 获取features数据
  const featuresData = props.data?.features || [];
  const hasData = props.data && props.data.code === 200;

  return (
    <Fragment>
      <Helmet>
        <title>Welcome to my ssr site</title>
        <meta name="description" content="Daxt，麻雀虽小，五脏俱全"></meta>
      </Helmet>
      <div className={styles.test}>
        <Header />
        
        <Card style={{ margin: '20px 0' }}>
          <Title level={2}>
            <RocketOutlined style={{ marginRight: 8, color: '#1890ff' }} />
            Welcome to Daxt.js
          </Title>
          <Paragraph>
            我是靳荣达，这是我的一款基于react生态的服务端渲染框架，名为Daxt.js，有好运之意，同时致敬Next.js这款优秀的开源框架
          </Paragraph>
        </Card>

        {hasData ? (
          <Card 
            title={
              <Title level={3} style={{ margin: 0 }}>
                <StarOutlined style={{ marginRight: 8, color: '#faad14' }} />
                项目特色功能
              </Title>
            } 
            style={{ margin: '20px 0' }}
          >
            <List
              itemLayout="horizontal"
              dataSource={featuresData}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <CheckCircleOutlined 
                        style={{ 
                          fontSize: '20px', 
                          color: '#52c41a',
                          marginTop: '4px'
                        }} 
                      />
                    }
                    title={
                      <Text strong style={{ fontSize: '16px' }}>
                        {item.title}
                      </Text>
                    }
                    description={
                      <Text type="secondary">
                        {item.desc}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        ) : (
          <Card style={{ margin: '20px 0' }}>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Text type="secondary">正在加载项目特色功能...</Text>
            </div>
          </Card>
        )}

        <Card title="技术栈支持" style={{ margin: '20px 0' }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={4}>
                <HeartOutlined style={{ marginRight: 8, color: '#52c41a' }} />
                开发体验
              </Title>
              <ul>
                <li>支持热更，借助nodemon、webpack watch以及npm-run-all等工具链的组合实现热更新</li>
                <li>清晰的项目结构，components和views文件夹下，随心所欲的编写react代码</li>
                <li>Routes.js中使用配置对象的形式进行路由配置</li>
              </ul>
            </div>

            <Divider />

            <div>
              <Title level={4}>路由与状态管理</Title>
              <ul>
                <li>集成了react-router-dom@6，支持react-router的最新特性</li>
                <li>重写useRoutes方法(getRoutes)，支持嵌套路由</li>
                <li>基于redux的状态管理支持</li>
                <li>基于配置模式实现路由组件异步数据的ssr</li>
              </ul>
            </div>

            <Divider />

            <div>
              <Title level={4}>样式与UI</Title>
              <ul>
                <li>对CSS Modules的样式服务端渲染支持</li>
                <li>集成Antd组件库，支持完整的SSR</li>
                <li>基于react-helmet进行更细节的SEO优化</li>
              </ul>
            </div>
          </Space>
        </Card>

        <Card style={{ margin: '20px 0' }}>
          <Space>
            <Button type="primary" size="large">
              开始使用
            </Button>
            <Button size="large">
              查看文档
            </Button>
          </Space>
          {hasData && (
            <div style={{ marginTop: 16 }}>
              <Text type="success">
                ✓ 数据加载状态: {props.data.message}
              </Text>
            </div>
          )}
        </Card>
      </div>
    </Fragment>
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
