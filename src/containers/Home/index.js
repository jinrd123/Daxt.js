import React, { useEffect } from "react";
import Header from "../../components/Header";
import { connect } from "react-redux";
import { getHomeList } from "./store/actions";

const Home = (props) => {
  useEffect(() => {
    const { getHomeList } = props;
    getHomeList();
  }, []);

  return (
    <div>
      <Header />
      home: This is a data -- "{props.name}" from redux
      <button onClick={() => alert("click1")}>click</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  name: state.home.name,
});

const mapDispatchToProps = (dispatch) => ({
  getHomeList() {
    dispatch(getHomeList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
