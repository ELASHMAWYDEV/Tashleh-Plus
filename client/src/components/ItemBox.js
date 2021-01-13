// @ts-nocheck
import { Link } from "react-router-dom";
import { AiFillTag, AiOutlineClockCircle } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";

//Styles
import "../styles/ItemBox.scss";

//Assets
import Image from "../assets/img/test-img.png";

const ItemBox = ({
  item: {
    title = "",
    description = "",
    peices = [],
    status = 1,

    username = "",
    createTime = new Date().getTime(),
    city = "",
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

  return (
    <div className="item-box-container">
      <div className="box-body">
        <div className="box-header">
          <Link>
            <h1>{title}</h1>
          </Link>
          <p
            className={`status-box ${
              status == 2
                ? "status-box-blue"
                : status == 3
                ? "status-box-red"
                : ""
            }`}
          >
            {statusText}
          </p>
        </div>
        <h3 className="description">
          هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
          النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من
          النصوص الأخرى إضافة إلى زيادة
        </h3>
        <div className="box-footer">
          <div className="item-option-container">
            <AiFillTag className="icon icon-tag" />
            <p>عدد القطع المطلوبة: 6</p>
          </div>
          <div className="item-option-container">
            <IoLocationOutline className="icon" />
            <p>الرياض</p>
          </div>
          <div className="item-option-container">
            <FaUserAlt className="icon" />
            <p>محمود العشماوي</p>
          </div>
          <div className="item-option-container">
            <AiOutlineClockCircle className="icon" />
            <p>منذ 2 ساعة</p>
          </div>
        </div>
        <div className="border-mask"></div>
      </div>
      <div className="img-container">
        <Link>
          <img src={Image} alt="Image" />
        </Link>
      </div>
    </div>
  );
};

export default ItemBox;
