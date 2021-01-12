import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Footer } from "./components/index";
import { Home, Auth } from "./routes/index";

//Styles
import "./styles/App.scss";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
