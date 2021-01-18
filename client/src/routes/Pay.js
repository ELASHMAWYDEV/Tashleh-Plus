// @ts-nocheck
import { FaDotCircle } from "react-icons/all";
import { Header, Footer } from "../components/index";

//Styles
import "../styles/Pay.scss";

const Pay = () => {
  return (
    <>
      <Header />
      <div className="pay-container">
        <h1>صفحة الدفع</h1>
        <div className="pay-box">
          <div className="box-header">
            <div className="right-items">
              <h3>تم اصدار الفاتورة بتاريخ</h3>
              <h2>15/1/2020</h2>
            </div>
            <div className="left-items">
              <h3>رقم الطلب</h3>
              <h2 className="bill-id">#1534</h2>
            </div>
          </div>
          <table className="bill-table">
            <thead>
              <tr>
                <th>المنتجات</th>
                <th>العدد</th>
                <th>السعر</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة</td>
                <td>4</td>
                <td>530</td>
              </tr>
              <tr>
                <td>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة</td>
                <td>4</td>
                <td>530</td>
              </tr>
              <tr>
                <td>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة</td>
                <td>4</td>
                <td>530</td>
              </tr>
              <tr>
                <td></td>
                <td>المجموع</td>
                <td>1090 ريال</td>
              </tr>
            </tbody>
          </table>
          <h2>اختر وسيلة الدفع المناسبة</h2>
          <div className="methods-container">
            <div className="right-items">
              <label>
                <input type="radio" name="payment_method" />
                <span className="radio-btn">
                  <FaDotCircle className="dot-icon" />
                </span>
                <p>Paypal</p>
              </label>
              <label>
                <input type="radio" name="payment_method" />
                <span className="radio-btn">
                  <FaDotCircle className="dot-icon" />
                </span>
                <p>فيزا / ماستر كارد</p>
              </label>
            </div>
            <div className="left-items">
              <button className="pay-btn pay-btn-disabled">
                التأكيد والدفع
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pay;
