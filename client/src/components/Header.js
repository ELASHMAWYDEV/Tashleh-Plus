// @ts-nocheck
import { Link, useLocation, useRouteMatch } from "react-router-dom";

//Styles
import "../styles/Header.scss";

//Assets
import Logo from "../assets/img/logo-white.png";

const Header = () => {
  const location = useLocation();

  return (
    <div className="header-container">
      <div className="logo-container">
        <Link to="/home">
          <img src={Logo} alt="Tashleh Plus" />
        </Link>
      </div>
      <div className="nav-container">
        <Link
          to="/home"
          className={`${
            location.pathname === "/home/requests" ||
            location.pathname === "/home/for-sale"
              ? "active-link"
              : ""
          }`}
        >
          القطع
        </Link>
        <Link
          to="/cars"
          className={`${location.pathname === "/cars" ? "active-link" : ""}`}
        >
          سيارات التشليح
        </Link>
      </div>
      <div className="left-btns-container">
        <Link to="/auth" className="auth-btn">
          تسجيل الدخول / حساب جديد
        </Link>
      </div>
    </div>
  );
};

export default Header;
