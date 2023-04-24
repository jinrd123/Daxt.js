import React from "react";
import Header from "../../components/Header";
import { changeNameAction, changeObjAction } from "../../store/actionCreator";
import { connect } from "react-redux";

const About = (props) => {
  return (
    <div>
      <Header />
      This is About page
      <button onClick={props.changeName}>派发action修改redux中的数据</button>
      {/* <button>派发action修改redux中的数据</button> */}
      <br />
      <button onClick={props.changeObj}>派发action修改redux中的obj数据</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeName() {
    dispatch(changeNameAction("Daxt.js"));
  },
  changeObj() {
    dispatch(changeObjAction({ info: "test2" }));
  },
});

export default connect(null, mapDispatchToProps)(About);
// export default About;
