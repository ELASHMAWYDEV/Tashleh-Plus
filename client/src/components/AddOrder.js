import { useState, useEffect, useRef } from "react";
import {
  IoIosClose,
  BsFillPlusSquareFill,
  IoIosCloseCircle,
  ImAttachment,
  BsFillMicFill,
  BiCheck,
} from "react-icons/all";

//Styles
import "../styles/AddOrder.scss";

const AddOrder = () => {
  const [isboxActive, setIsBoxActive] = useState(false);
  const [peices, setPeices] = useState([{ name: "", quantity: 1 }]);

  const containerRef = useRef(null);
  const boxRef = useRef(null);
  const inputsRef = useRef(new Array());

  useEffect(() => {
    window.addEventListener("mouseup", clickHandle);
  }, []);

  useEffect(() => {
    console.log(peices);
  }, [peices]);

  const clickHandle = (e) => {
    if (e.target === containerRef.current) {
      setIsBoxActive(false);
    }
  };

  //maxNum
  const maxNumOfPeices = Array(15)
    .fill("")
    .map((v, idx) => idx + 1);

  return (
    <div className="add-order-container">
      <div className="btn-container">
        <div className="btn-add" onClick={() => setIsBoxActive(!isboxActive)}>
          <p>أضف طلبك</p>
          <div className="plus-container">
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      {isboxActive && (
        <div ref={containerRef} className="add-form-container">
          <div ref={boxRef} className="floating-box">
            <IoIosClose
              className="close-icon"
              onClick={() => setIsBoxActive(false)}
            />
            <div className="box-body">
              <h1>اضف طلب جديد</h1>
              <div className="input-item">
                <input placeholder="عنوان الطلب" type="text" />
              </div>
              <div className="input-item">
                <textarea placeholder="تفاصيل الطلب" />
              </div>
              <h2>القطع المطلوبة</h2>
              {peices.map((item, i) => (
                <div
                  className="input-item"
                  ref={(el) => inputsRef.current.push(el)}
                >
                  <input
                    placeholder="اسم القطعة"
                    type="text"
                    className="peice-input"
                    value={item.value}
                    onChange={(el) =>
                      setPeices([
                        ...peices.map((item, index) =>
                          index === i
                            ? { ...item, name: el.target.value }
                            : item
                        ),
                      ])
                    }
                  />
                  <div className="select-container">
                    <select
                      onChange={(el) =>
                        setPeices([
                          ...peices.map((item, index) =>
                            index === i
                              ? { ...item, quantity: +el.target.value }
                              : item
                          ),
                        ])
                      }
                    >
                      <option>عدد القطع</option>
                      {maxNumOfPeices.map((num) => (
                        <option
                          key={num}
                          value={num}
                          selected={item.quantity === num ? true : false}
                        >
                          {num} قطعة
                        </option>
                      ))}
                    </select>
                    <span></span>
                  </div>
                  {i != peices.length - 1 && (
                    <IoIosCloseCircle
                      className="remove-btn"
                      onClick={() =>
                        setPeices([...peices.filter((p, index) => index !== i)])
                      }
                    />
                  )}
                  {i == peices.length - 1 && (
                    <BsFillPlusSquareFill
                      className="plus-btn"
                      onClick={() =>
                        setPeices([...peices, { name: "", quantity: 1 }])
                      }
                    />
                  )}
                </div>
              ))}
              <div className="upload-container">
                <p>صور القطع (اختياري)</p>
                <label className="upload-btn">
                  <p>ارفاق الصور</p>
                  <ImAttachment className="attachment-icon" />
                  <input type="file" multiple accept=".jpg,.jpeg,.png" />
                </label>
              </div>
              <div className="record-container">
                <p>مقطع صوتي (اجباري)</p>
                <label className="record-btn">
                  <p>بدء التسجيل</p>
                  <BsFillMicFill className="record-icon" />
                  <input type="file" accept=".mp3" />
                </label>
              </div>
              <div className="checkboxs-container">
                <label>
                  <input type="checkbox" />
                  <span className="checkmark">
                    <BiCheck className="checkmark-icon" />
                  </span>
                  <p>هذا الطلب لا يحتوي علي أي وسائل تواصل خارج الموقع</p>
                </label>
                <label>
                  <input type="checkbox" />
                  <span className="checkmark">
                    <BiCheck className="checkmark-icon" />
                  </span>
                  <p>لقد راجعت شروط موقع تشليح بلس</p>
                </label>
              </div>
              <div className="submit-container">
                <button className="submit-btn">تقديم الطلب</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddOrder;
