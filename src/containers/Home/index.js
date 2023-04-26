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
      home: This is a data -- "{props.name}" from redux
      <br />
      {props.data}
      <button onClick={() => alert("click1")}>click</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  name: state.home.name,
  data: state.home.data,
});

const mapDispatchToProps = (dispatch) => ({
  getHomeData() {
    dispatch(getHomeData());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
