// @ts-nocheck
import { Link, useRouteMatch } from "react-router-dom";
import { AiFillTag, AiOutlineClockCircle } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";

//Helpers
import formatTime from "../helpers/formatTime";

//Styles
import "../styles/ItemBox.scss";

//Assets
import Image from "../assets/img/test-img.png";

const ItemBox = ({
  item: {
    id,
    type,
    title,
    description,
    peices,
    status,
    username,
    createTime,
    city,
    peicesAvailable,
    price,
  },
}) => {
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
    <Link
      to={
        type === 1
          ? `/home/requests/${id}`
          : type === 2
          ? `/home/for-sale/${id}`
          : type === 3
          ? `/cars/${id}`
          : "#"
      }
      className="item-box-container"
    >
      <div className="box-body">
        <div className="box-header">
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
        <h3 className="description">{description}</h3>
        <div className="box-footer">
          {[1, 2].includes(type) && (
            <div className="item-option-container">
              <AiFillTag className="icon icon-tag" />
              {type === 1 && (
                <p>عدد القطع المطلوبة: {totalRemainingQuantity}</p>
              )}
              {type === 2 && <p>عدد القطع المتوفرة: {peicesAvailable}</p>}
            </div>
          )}
          <div className="item-option-container">
            <IoLocationOutline className="icon" />
            <p>{city}</p>
          </div>
          <div className="item-option-container">
            <FaUserAlt className="icon" />
            <p>{username}</p>
          </div>
          <div className="item-option-container">
            <AiOutlineClockCircle className="icon" />
            <p>{formatTime(createTime)}</p>
          </div>
        </div>
        <div className="border-mask"></div>
      </div>
      <div className="img-container">
        <img src={Image} alt="item" />
      </div>
    </Link>
  );
};

export default ItemBox;
