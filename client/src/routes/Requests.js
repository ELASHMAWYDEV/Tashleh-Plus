import { useState, useEffect } from "react";
import { ItemBox, Pagination } from "../components/index";

//Styles
import "../styles/Requests.scss";

const Requests = () => {
  const filterList = require("../util/filterList.json");
  const itemList = require("../util/itemList.json");

  const [selectedCarType, setSelectedCarType] = useState(0);
  const [selectedCarModel, setSelectedCarModel] = useState(0);

  //Years
  const now = new Date().getUTCFullYear();
  const years = Array(now - (now - 55))
    .fill("")
    .map((v, idx) => now - idx);

  useEffect(() => {}, []);

  return (
    <div className="requests-container">
      <h1 className="requests-title">طلبات القطع غير الموجودة</h1>
      <div className="requests-body">
        <div className="filter-container">
          <h2 className="filter-title">تصفية</h2>
          <div className="one-filter-container">
            <h3>نوع السيارة</h3>
            <div className="options-container">
              {filterList.map((item, i) => (
                <div
                  className={`option ${
                    i === selectedCarType ? "option-active" : ""
                  }`}
                  onClick={() => {
                    setSelectedCarType(i);
                    setSelectedCarModel(0);
                  }}
                >
                  {item.carType}
                </div>
              ))}
            </div>
          </div>
          <div className="one-filter-container">
            <h3>ماركة السيارة</h3>
            <div className="options-container">
              {filterList[selectedCarType].models.map((item, i) => (
                <div
                  className={`option ${
                    i === selectedCarModel ? "option-active" : ""
                  }`}
                  onClick={() => setSelectedCarModel(i)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="one-filter-container">
            <h3>الموديل</h3>
            <div className="select-container">
              <select>
                <option>كل الموديلات</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <span></span>
            </div>
          </div>
        </div>
        <div className="items-container">
          {itemList.map((item, i) => (
            <ItemBox key={i} item={item} />
          ))}
          <Pagination numOfPages={5}/>
        </div>
      </div>
    </div>
  );
};

export default Requests;
