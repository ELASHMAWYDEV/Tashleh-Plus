import { Route, Switch } from "react-router-dom";
import { Header } from "../components/index";
import { Peices, Cars, ItemPage } from "./index";

//Styles
import "../styles/Home.scss";

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <Switch>
        <Route path="/home/for-sale/:id" component={ItemPage} />
        <Route path="/home/requests/:id" component={ItemPage} />
        <Route path="/home" component={Peices} />
        <Route path="/cars/:id" component={ItemPage} />
        <Route path="/cars" component={Cars} />
      </Switch>
    </div>
  );
};

export default Home;
