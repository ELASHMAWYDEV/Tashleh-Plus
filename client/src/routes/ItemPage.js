// @ts-nocheck
import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useRouteMatch } from "react-router-dom";
import {
  AiFillTag,
  AiOutlineClockCircle,
  IoLocationOutline,
  FaUserAlt,
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
  IoIosClose,
  FaInfoCircle,
  ImAttachment,
  BsFillMicFill,
  BiCheck,
} from "react-icons/all";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Header, Footer } from "../components/index";

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

  const buyBoxRef = useRef(null);
  const contactBoxRef = useRef(null);
  const offerBoxRef = useRef(null);

  const [peicesOfferd, setPeicesOfferd] = useState([]);
  const [buyBoxVisible, setBuyBoxVisible] = useState(false);
  const [contactBoxVisible, setContactBoxVisible] = useState(false);
  const [offerBoxVisible, setOfferBoxVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("mouseup", clickHandle);
  }, []);

  const clickHandle = (e) => {
    if (e.target === buyBoxRef.current) {
      setBuyBoxVisible(false);
    }
    if (e.target === contactBoxRef.current) {
      setContactBoxVisible(false);
    }
    if (e.target === offerBoxRef.current) {
      setOfferBoxVisible(false);
    }
  };

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
    <>
      <Header />
      <div className="item-page-container">
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
            {type === 2 && (
              <p className="price-box">سعر القطعة: {price} ريال</p>
            )}
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
          {type === 1 && (
            <div className="peices-container">
              <h2>القطع المطلوبة</h2>
              {peices.map((item, i) => (
                <div className="peice-container">
                  <p className="peice-index">{i + 1}</p>
                  <p className="peice-name">{item.name}</p>
                  <h3>عدد القطع المطلوبة: {item.quantity}</h3>
                </div>
              ))}
            </div>
          )}
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
            <button
              className="action-btn contact-btn"
              onClick={() => setContactBoxVisible(true)}
            >
              التواصل مع البائع
            </button>
          )}
          <p className="notice">
            {type === 1 && "اضغط هنا لتقديم عرض للزبون"}
            {type === 2 &&
              "يمكنك تحديد عدد القطع التي تريدها بعد الضغط علي شراء"}
            {type === 3 && "أو يمكنك شراء السيارة "}
          </p>
          {type === 1 && (
            <button
              className="action-btn contact-btn"
              onClick={() => setOfferBoxVisible(true)}
            >
              تقديم عرض
            </button>
          )}
          {[2, 3].includes(type) && (
            <button
              className="action-btn buy-btn"
              onClick={() => setBuyBoxVisible(true)}
            >
              شراء فوري
            </button>
          )}
        </div>

        {buyBoxVisible && (
          <div className="confirm-box-container" ref={buyBoxRef}>
            <div className="floating-box">
              <IoIosClose
                className="close-icon"
                onClick={() => setBuyBoxVisible(false)}
              />
              <div className="box-body">
                <h3>هل أنت متأكد من أنك تريد شراء</h3>
                <h1>{title}</h1>
                {type === 2 && (
                  <div className="how-many-container">
                    <input
                      type="number"
                      placeholder="عدد القطع التي تريدها"
                      min={0}
                      max={peicesAvailable}
                    />
                  </div>
                )}
                <div className="box-btns">
                  <button className="yes-btn">الذهاب للدفع</button>
                  <button
                    className="no-btn"
                    onClick={() => setBuyBoxVisible(false)}
                  >
                    الغاء
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {contactBoxVisible && (
          <div className="contact-box-container" ref={contactBoxRef}>
            <div className="floating-box">
              <IoIosClose
                className="close-icon"
                onClick={() => setContactBoxVisible(false)}
              />
              <div className="box-body">
                <h3>التواصل مع {username}</h3>
                <h4>بخصوص</h4>
                <h1>{title}</h1>
                <h2>هل أنت متأكد ؟</h2>
                <div className="box-btns">
                  <button className="yes-btn">ابدأ المحادثة</button>
                  <button
                    className="no-btn"
                    onClick={() => setContactBoxVisible(false)}
                  >
                    الغاء
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {offerBoxVisible && (
          <div className="offer-box-container" ref={offerBoxRef}>
            <div className="floating-box">
              <IoIosClose
                className="close-icon"
                onClick={() => setOfferBoxVisible(false)}
              />
              <div className="box-body">
                <h1>تقديم عرض للزبون</h1>
                <div className="info-container">
                  <FaInfoCircle className="info-icon" />
                  <p>
                    1- يمكنك تقديم عرض علي القطع المتوفرة لديك فقط ، ولا يلزم
                    تقديم عرض علي كل القطع التي يطلبها الزبون في حال لم تتوفر
                    جميعها لديك
                    <br />
                    2- الزبون له الحق في أن يوافق علي عرضك بالكامل أو جزء منه
                    يرجي الالتزام بشروط الموقع وعدم مشاركة أي وسائل تواصل خارج
                    الموقع
                    <br />
                    3- لضمان حقك كبائع يرجي التواصل من خلال المنصة فقط ، وعدم
                    مشاركة أي وسائل تواصل خارج المنصة
                  </p>
                </div>
                <h2>القطع المتوفرة</h2>
                <div className="peices-container">
                  {peices.map((item, i) => (
                    <div className="peice-form-container">
                      <div className="peice-container">
                        <p className="peice-index">{i + 1}</p>
                        <p className="peice-name">{item.name}</p>
                        <h3>عدد القطع المطلوبة: {item.quantity}</h3>
                      </div>
                      <div className="inputs-container">
                        <div className="select-container">
                          <select>
                            <option>اختر عدد القطع</option>
                            {[...Array(item.quantity)].map((item, i) => (
                              <option key={i} value={i + 1}>
                                {i + 1} قطعة
                              </option>
                            ))}
                          </select>
                          <span></span>
                        </div>
                        <input
                          type="number"
                          placeholder="سعر القطعة بالريال السعودي"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <textarea
                  className="message-box"
                  placeholder="يرجي كتابة رسالة للزبون توضح له ما الذي ستوفره له"
                />
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
                  <button className="submit-btn">تقديم العرض</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ItemPage;
