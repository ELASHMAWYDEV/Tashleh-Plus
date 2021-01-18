import {
  Link,
  Route,
  useLocation,
  useRouteMatch,
  Redirect,
  Switch,
} from "react-router-dom";
import { AddOrder, Footer, Header } from "../components/index";
import { Requests, ForSale } from "./index";

//Styles
import "../styles/Peices.scss";

const Peices = () => {
  const { path } = useRouteMatch();
  const location = useLocation();

  return (
    <>
      <Header />
      <div className="peices-container">
        <Switch>
          <Redirect exact strict from="/home" to={`/home/requests`} />
        </Switch>
        <AddOrder />
        <div className="nav-btns">
          <Link
            to={`/home/requests`}
            className={
              location.pathname === `/home/requests` ? "active-nav-btn" : ""
            }
          >
            طلبات القطع من الزبائن
          </Link>
          <Link
            to={`/home/for-sale`}
            className={
              location.pathname === `/home/for-sale` ? "active-nav-btn" : ""
            }
          >
            قسم عرض القطع
          </Link>
        </div>
        <Route exact path={`/home/requests`}>
          <Requests />
        </Route>
        <Route exact path={`/home/for-sale`}>
          <ForSale />
        </Route>
      </div>
      <Footer />
    </>
  );
};

export default Peices;
