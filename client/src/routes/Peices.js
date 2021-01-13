import {
  Link,
  Route,
  useLocation,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import { AddOrder } from "../components/index";
import { Requests } from "./index";

//Styles
import "../styles/Peices.scss";

const Peices = () => {
  const { path } = useRouteMatch();
  const location = useLocation();

  return (
    <div className="peices-container">
      <Redirect exact from={path} to={`${path}/requests`} />
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
        <h1>for-sale</h1>
      </Route>
    </div>
  );
};

export default Peices;
