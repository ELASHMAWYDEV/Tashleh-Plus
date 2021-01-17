import { useState, useEffect, useRef } from "react";
import { IoIosClose } from "react-icons/all";

//Styles
import "../styles/AddOrder.scss";

const AddOrder = () => {
  const [isboxActive, setIsBoxActive] = useState(false);

  const containerRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mouseup", clickHandle);
  }, []);


  const clickHandle = (e) => {
    if (e.target === containerRef.current) {
      setIsBoxActive(false);
    }
  };

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
          </div>
        </div>
      )}
    </div>
  );
};

export default AddOrder;
