const CityModel = require("../models/City");

module.exports = async ({ title, description, peices, city }) => {
  try {
    let errors = [];

    //Required
    if (!title) errors.push("يجب كتابة عنوان للطلب");
    if (!description) errors.push("يجب كتابة تفاصيل الطلب");
    if (!peices || !Array.isArray(peices) || peices.length == 0)
      errors.push("يجب اضافة قطعة واحدة علي الأقل للطلب");
    if (!city) errors.push("يجب اختيار المدينة");

    //Peices Validation
    for (let peice of peices) {
      if (!peice.quantity && peice.name) {
        errors.push(`يجب تحديد عدد القطع المطلوبة من: ${peice.name}`);
      }
    }

    //Send any empty errors
    if (errors.length != 0)
      return {
        status: false,
        errors,
      };

    //City
    if (!(await CityModel.findOne({ _id: +city })))
      errors.push("يرجي اختيار مدينة من المسجلين لدينا في الموقع");

    if (errors.length == 0) {
      const peiceRequest = {
        title,
        description,
        peices,
        city: +city,
      };

      return {
        status: true,
        peiceRequest,
      };
    } else {
      return {
        status: false,
        errors,
      };
    }
  } catch (e) {
    return {
      status: false,
      errors: [e.message],
    };
  }
};
