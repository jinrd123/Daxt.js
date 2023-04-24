import React from "react";
import Header from "../../components/Header";
import { connect } from "react-redux";

const Home = (props) => {
  return (
    <div>
      <Header />
      home: This is a data -- "{props.name}" from redux
      <button onClick={() => alert("click1")}>click</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  name: state.name,
});

export default connect(mapStateToProps, null)(Home);
