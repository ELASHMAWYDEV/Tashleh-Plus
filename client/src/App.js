import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Footer } from "./components/index";

//Styles
import "./styles/App.scss";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={() => <h1>Home</h1>} />
          <Route exact path="/auth" component={() => <h1>Auth</h1>} />
          <Route
            exact
            path="/auth/vendor/register"
            component={() => <h1>Vendor register</h1>}
          />
          <Route
            exact
            path="/auth/vendor/login"
            component={() => <h1>Vendor login</h1>}
          />
          <Route
            exact
            path="/auth/customer/register"
            component={() => <h1>Customer register</h1>}
          />
          <Route
            exact
            path="/auth/customer/login"
            component={() => <h1>Customer login</h1>}
          />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
