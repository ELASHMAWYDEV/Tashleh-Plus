// @ts-nocheck
import { useEffect, useState } from "react";
import { useParams, useLocation, useRouteMatch } from "react-router-dom";
import {
  AiFillTag,
  AiOutlineClockCircle,
  IoLocationOutline,
  FaUserAlt,
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/all";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";

//Styles
import "../styles/ItemPage.scss";
import "swiper/swiper-bundle.css";
import "swiper/swiper-bundle.min.css";

//Assets
import Image from "../assets/img/test-img.png";

//Helpers
import formatTime from "../helpers/formatTime";

const ItemPage = () => {
  const { id } = useParams();
  const { path } = useRouteMatch();

  let type = null;
  switch (path) {
    case "/home/requests/:id":
      type = 1;
      break;
    case "/home/for-sale/:id":
      type = 2;
      break;
    case "/cars/:id":
      type = 3;
      break;
  }

  SwiperCore.use([Navigation, Pagination]);
  const testList =
    type === 1
      ? require("../util/itemList.json")
      : type === 2
      ? require("../util/forSale.json")
      : type === 3
      ? require("../util/cars.json")
      : null;

  const {
    title,
    description,
    peicesAvailable,
    price,
    username,
    createTime,
    city,
    peices,
    status,
  } = testList.find((item) => +item.id === +id) || {};

  let statusText = "";
  switch (status) {
    //1 ==> مفتوح
    //2 ==> تمت الصفقة
    //3 ==> ملغي
    case 1:
      statusText = "مفتوح";
      break;
    case 2:
      statusText = "تمت الصفقة";
      break;
    case 3:
      statusText = "ملغي";
      break;
    default:
      statusText = "خطأ في الحالة";
      break;
  }

  let totalRemainingQuantity = 0;
  if (type === 1) {
    for (let p of peices) {
      totalRemainingQuantity += p.quantity;
    }
  }

  return (
    <div className="peice-page-container">
      <div className="item-container">
        <div className="item-header">
          <h1>{title}</h1>
          {type === 1 && (
            <p
              className={`status-box ${
                status === 2
                  ? "status-box-blue"
                  : status === 3
                  ? "status-box-red"
                  : ""
              }`}
            >
              {statusText}
            </p>
          )}
          {type === 2 && <p className="price-box">سعر القطعة: {price} ريال</p>}
          {type === 3 && <p className="price-box">{price} ريال</p>}
        </div>
        <div className="slider-container">
          <Swiper
            slidesPerView={1}
            tag="section"
            wrapperTag="ul"
            navigation={{
              prevEl: ".right-arrow",
              nextEl: ".left-arrow",
            }}
            pagination
          >
            <SwiperSlide tag="li">
              <img src={Image} alt="Peice" />
            </SwiperSlide>
            <SwiperSlide tag="li">
              <img src={Image} alt="Peice" />
            </SwiperSlide>
            <SwiperSlide tag="li">
              <img src={Image} alt="Peice" />
            </SwiperSlide>
            <SwiperSlide tag="li">
              <img src={Image} alt="Peice" />
            </SwiperSlide>
            <IoIosArrowDroprightCircle className="right-arrow" />
            <IoIosArrowDropleftCircle className="left-arrow" />
          </Swiper>
        </div>
        <div className="desc-container">
          <h2>التفاصيل</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="info-container">
        <div className="info-box">
          <div className="info-item">
            <FaUserAlt className="icon" />
            <p>صاحب الطلب </p>
            <h3>{username}</h3>
          </div>
          <div className="info-item">
            <AiOutlineClockCircle className="icon" />
            <p>تاريخ الطلب </p>
            <h3>{formatTime(createTime)}</h3>
          </div>
          {[1, 2].includes(type) && (
            <div className="info-item">
              <AiFillTag className="icon icon-tag" />
              {type === 1 && (
                <>
                  <p>عدد القطع المطلوبة </p>
                  <h3>{totalRemainingQuantity}</h3>
                </>
              )}
              {type === 2 && (
                <>
                  <p>عدد القطع المتوفرة </p>
                  <h3>{peicesAvailable}</h3>
                </>
              )}
            </div>
          )}
          <div className="info-item">
            <IoLocationOutline className="icon" />
            <p>{city}</p>
          </div>
        </div>
        {[2, 3].includes(type) && (
          <button className="action-btn contact-btn">التواصل مع البائع</button>
        )}
        <p className="notice">
          {type === 1 && "اضغط هنا لتقديم عرض للزبون"}
          {type === 2 && "يمكنك تحديد عدد القطع التي تريدها بعد الضغط علي شراء"}
          {type === 3 && "أو يمكنك شراء السيارة "}
        </p>
        {type === 1 && (
          <button className="action-btn contact-btn">تقديم عرض</button>
        )}
        {[2, 3].includes(type) && (
          <button className="action-btn buy-btn">شراء فوري</button>
        )}
      </div>
    </div>
  );
};

export default ItemPage;
