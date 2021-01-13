import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Footer } from "./components/index";
import { Home, Auth } from "./routes/index";

//Styles
import "./styles/App.scss";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Redirect exact strict from="/" to="/home" />
          <Route path="/auth" component={Auth} />
          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
