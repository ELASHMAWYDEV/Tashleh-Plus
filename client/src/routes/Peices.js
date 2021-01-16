import {
  Link,
  Route,
  useLocation,
  useRouteMatch,
  Redirect,
  Switch,
} from "react-router-dom";
import { AddOrder } from "../components/index";
import { Requests, ForSale } from "./index";

//Styles
import "../styles/Peices.scss";

const Peices = () => {
  const { path } = useRouteMatch();
  const location = useLocation();

  return (
    <div className="peices-container">
      <Switch>
        <Redirect exact strict from={path} to={`${path}/requests`} />
      </Switch>
      <AddOrder />
      <div className="nav-btns">
        <Link
          to={`${path}/requests`}
          className={
            location.pathname === `${path}/requests` ? "active-nav-btn" : ""
          }
        >
          طلبات القطع من الزبائن
        </Link>
        <Link
          to={`${path}/for-sale`}
          className={
            location.pathname === `${path}/for-sale` ? "active-nav-btn" : ""
          }
        >
          قسم عرض القطع
        </Link>
      </div>
      <Route path={`${path}/requests`}>
        <Requests />
      </Route>
      <Route path={`${path}/for-sale`}>
        <ForSale />
      </Route>
    </div>
  );
};

export default Peices;
