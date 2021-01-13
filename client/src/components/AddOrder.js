import { useState, useEffect, useRef } from "react";

//Styles
import "../styles/AddOrder.scss";

const AddOrder = () => {
  const [isboxActive, setIsBoxActive] = useState(false);
  const [topPoistion, setTopPosition] = useState(0);

  const containerRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    console.log(boxRef);
    window.addEventListener("scroll", handleScroll);
    // window.addEventListener("mouseup", clickHandle);
  }, []);

  const handleScroll = () => {
    setTopPosition(window.pageYOffset);
  };

  const clickHandle = (e) => {
    e.preventDefault();
    if (!boxRef.current.contains(e.target)) {
      if (containerRef) {
        setIsBoxActive(false);
      }
      setIsBoxActive(false);
      window.removeEventListener("mouseup", clickHandle);
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
          <div
            ref={boxRef}
            className="form-box"
            onLoad={() => console.log(this)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default AddOrder;
