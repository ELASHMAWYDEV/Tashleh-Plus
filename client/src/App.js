import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Footer, Loader } from "./components/index";
import { Home, Auth } from "./routes/index";
import { AppProvider, useLoadingContext } from "./helpers/AppProvider";

//Styles
import "./styles/App.scss";

const App = () => {
  return (
    <AppProvider>
      <div className="App">
        <Loader />
        <Router>
          <Switch>
            <Redirect exact strict from="/" to="/home" />
            <Route path="/auth" component={Auth} />
            <Route path="/" component={Home} />
          </Switch>
          <Footer />
        </Router>
      </div>
    </AppProvider>
  );
};

export default App;
