// @ts-nocheck
import { useState, useEffect } from "react";
import {
  Route,
  Link,
  useRouteMatch,
  useLocation,
  useHistory,
} from "react-router-dom";

//Styles
import "../styles/Auth.scss";

//Assets
import Logo from "../assets/img/logo-blue.png";

const Auth = () => {
  const { path } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const [type, setType] = useState(
    location.pathname.split("/")[2] || "customer"
  );

  useEffect(() => {
    setType(location.pathname.split("/")[2] || "customer");
  }, [location]);
  return (
    <div className="auth-container">
      {/*-------------Logo container START-------------*/}

      <div className="logo-container">
        <img src={Logo} alt="تشليح بلس" onClick={() => history.push("/")} />
      </div>

      {/*-------------Logo container END-----------------*/}

      <div className="auth-box-container">
        {/*-------------Box Header START-------------*/}

        <div className="box-header">
          <Route exact path={path}>
            <h3>من أنت</h3>
          </Route>
          <Route path={[`${path}/customer`, `${path}/vendor`]}>
            <Link
              to={`${path}/${type}/login`}
              className="auth-btn"
              style={{
                backgroundColor:
                  [`${path}/customer/login`, `${path}/vendor/login`].indexOf(
                    location.pathname
                  ) !== -1
                    ? " #287AE1"
                    : "transparent",
              }}
            >
              تسجيل الدخول
            </Link>
            <Link
              to={`${path}/${type}/register`}
              className="auth-btn"
              style={{
                backgroundColor:
                  [
                    `${path}/customer/register`,
                    `${path}/vendor/register`,
                  ].indexOf(location.pathname) !== -1
                    ? " #287AE1"
                    : "transparent",
              }}
            >
              حساب جديد
            </Link>
          </Route>
        </div>

        {/*-------------Box Header END-------------*/}

        {/*-------------Box Body START-------------*/}

        <div
          className="box-body"
          style={{
            display:
              location.pathname !==
              `${path}/${type}/${location.pathname.split("/")[3]}`
                ? "flex"
                : "block",
          }}
        >
          <Route exact path={path}>
            <Link to={`${path}/customer/login`} className="right-btn">
              زبون
            </Link>
            <Link to={`${path}/vendor/login`} className="left-btn">
              بائع
            </Link>
          </Route>

          <Route path={[`${path}/customer/login`, `${path}/vendor/login`]}>
            <div className="box-title">
              <div>
                أنا
                <h2
                  onClick={() =>
                    history.push(
                      `${path}/${
                        type === "customer" ? "vendor" : "customer"
                      }/register`
                    )
                  }
                >
                  {type === "customer" ? "زبون" : "بائع"}
                </h2>
              </div>
            </div>
            <div className="input-items">
              <div className="input-item">
                <input
                  type="text"
                  placeholder="اسم المستخدم أو البريد الالكتروني"
                />
              </div>
              <div className="input-item">
                <input type="password" placeholder="كلمة المرور" />
              </div>
              <div className="input-item">
                <button className="auth-btn">تسجيل الدخول</button>
              </div>
            </div>
            <div className="box-footer">
              <div className="no-account">
                <p>ليس لديك حساب ؟</p>
                <Link to={`${path}/${type}/register`}>تسجيل حساب جديد</Link>
              </div>
              <Link to="/" className="go-home">
                العودة الي الصفحة الرئيسية
              </Link>
            </div>
          </Route>

          <Route
            path={[`${path}/customer/register`, `${path}/vendor/register`]}
          >
            <div className="box-title">
              <div>
                أنا
                <h2
                  onClick={() =>
                    history.push(
                      `${path}/${
                        type === "customer" ? "vendor" : "customer"
                      }/register`
                    )
                  }
                >
                  {type === "customer" ? "زبون" : "بائع"}
                </h2>
              </div>
            </div>
            <div className="input-items">
              <div className="input-item">
                <input type="text" placeholder="اسم المستخدم" />
              </div>
              <div className="input-item">
                <input type="text" placeholder="البريد الالكتروني" />
              </div>
              <div className="input-item">
                <input type="text" placeholder="الاسم بالكامل" />
              </div>
              <div className="input-item">
                <input type="text" placeholder="المدينة" />
              </div>
              <div className="input-item">
                <input type="text" placeholder="الحي" />
              </div>
              <div className="input-item">
                <input type="text" placeholder="الجوال" />
              </div>
              <div className="input-item">
                <input type="password" placeholder="كلمة المرور" />
              </div>
              <div className="input-item">
                <input type="password" placeholder="تأكيد كلمة المرور" />
              </div>
              <div className="input-item">
                <button className="auth-btn">تسجيل</button>
              </div>
            </div>
            <div className="box-footer">
              <div className="no-account">
                <p>ليس لديك حساب ؟</p>
                <Link to={`${path}/${type}/login`}>تسجيل الدخول</Link>
              </div>
              <Link to="/" className="go-home">
                العودة الي الصفحة الرئيسية
              </Link>
            </div>
          </Route>
        </div>

        {/*-------------Box Body END-------------*/}
      </div>
    </div>
  );
};

export default Auth;