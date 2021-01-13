// @ts-nocheck
import { Link, useLocation } from "react-router-dom";

//Styles
import "../styles/Header.scss";

//Assets
import Logo from "../assets/img/logo-white.png";

const Header = () => {
  const location = useLocation();

  return (
    <div className="header-container">
      <div className="logo-container">
        <img src={Logo} alt="Tashleh Plus" />
      </div>
      <div className="nav-container">
        <Link
          to="/home"
          className={`${location.pathname.startsWith("/home") ? "active-link" : ""}`}
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
