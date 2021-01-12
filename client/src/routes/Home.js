import { Route } from "react-router-dom";
import { Header } from "../components/index";

//Styles
import "../styles/Home.scss";

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <Route exact path="/" component={() => <h1>s</h1>}/>
      <Route exact path="/cars" component={() => <h1>Cars</h1>}/>
    </div>
  );
};

export default Home;
