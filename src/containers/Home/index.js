import React from "react";
import Header from "../../components/Header";

const Home = () => {
  return (
    <div>
      <Header />
      home
      <button onClick={() => alert("click1")}>click</button>
    </div>
  );
};

export default Home;
