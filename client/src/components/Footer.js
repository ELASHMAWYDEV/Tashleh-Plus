import { Link } from "react-router-dom";

//Styles
import "../styles/Footer.scss";

const Footer = () => {
  return (<div className="footer-container">
    <div className="right-items">
      <Link to="/">الرئيسية</Link>
      <Link to="/">سياسة الخصوصية</Link>
      <Link to="/">شروط الاستخدام</Link>
    </div>
    <div className="left-items">
      <p>Copyright © {new Date().getFullYear()} Tashleh Plus</p>
    </div>
  </div>)
}

export default Footer;