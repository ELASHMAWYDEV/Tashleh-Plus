import { Route } from "react-router-dom";
import { Header } from "../components/index";
import { Peices, Cars } from "./index";

//Styles
import "../styles/Home.scss";

const Home = () => {

  return (
    <div className="home-container">
      <Header />
      <Route path="/home" component={Peices} />
      <Route exact path="/cars" component={Cars} />
    </div>
  );
};

export default Home;
