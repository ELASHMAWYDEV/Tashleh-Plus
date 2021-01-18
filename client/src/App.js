import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Loader } from "./components/index";
import { Auth, ItemPage, Peices, Cars, Pay } from "./routes/index";
import { useAuthContext, useLoadingContext } from "./helpers/AppProvider";

//Styles
import "./styles/App.scss";

const App = () => {
  const { isLoggedIn } = useAuthContext();
  const { setIsLoading } = useLoadingContext();

  return (
    <div className="App">
      <Loader />
      <Router>
        <Switch>
          {!isLoggedIn && <Route path="/auth" component={Auth} />}
          <Route exact path="/home/for-sale/:id" component={ItemPage} />
          <Route exact path="/home/for-sale" component={Peices} />
          <Route exact path="/home/requests/:id" component={ItemPage} />
          <Route exact path="/home/requests" component={Peices} />
          <Route exact path="/cars/:id" component={ItemPage} />
          <Route exact path="/cars" component={Cars} />
          <Route exact path="/pay" component={Pay} />
          <Route>
            <Redirect to="/home/requests" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
