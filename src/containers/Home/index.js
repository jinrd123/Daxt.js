import React, { useEffect } from "react";
import Header from "../../components/Header";
import { connect } from "react-redux";
import { getHomeData } from "./store/actions";

const Home = (props) => {
  useEffect(() => {
    const { getHomeData } = props;
    getHomeData();
  }, []);

  return (
    <div>
      <Header />
      <br />
      {props.data}
    </div>
  );
};

Home.loadData = (store) => {
  return store.dispatch(getHomeData(true));
};

const mapStateToProps = (state) => ({
  data: state.home.data,
});

const mapDispatchToProps = (dispatch) => ({
  getHomeData() {
    dispatch(getHomeData(false));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
