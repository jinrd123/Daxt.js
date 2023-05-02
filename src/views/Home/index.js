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
      <br />
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
