const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const UserModel = require("../../models/User");
const CityModel = require("../../models/City");

module.exports = async ({
  type,
  username,
  email,
  name,
  region,
  city,
  phone,
  password,
  passwordConfirm,
}) => {
  try {
    let errors = [];

    //Required
    if (!type) errors.push("يجب تحديد نوع المستخدم");
    if (!username) errors.push("يجب كتابة اسم المستخدم");
    if (!email) errors.push("يجب كتابة البريد الالكتروني");
    if (!name) errors.push("يجب كتابة الاسم");
    if (!phone) errors.push("يجب كتابة رقم الهاتف");
    if (!region) errors.push("يجب كتابة اسم الحي");
    if (!city) errors.push("يجب اختيار");
    if (!password) errors.push("يجب كتابة كلمة المرور");
    if (!passwordConfirm) errors.push("يجب كتابة تأكيد كلمة المرور");

    //Send any empty errors
    if (errors.length != 0)
      return {
        status: false,
        errors,
      };

    //Unique
    if (await UserModel.findOne({ email }))
      errors.push("هذا البريد الالكتروني مسجل من قبل");
    if (await UserModel.findOne({ username }))
      errors.push("اسم المستخدم مسجل من قبل");
    if (await UserModel.findOne({ phone }))
      errors.push("رقم الهاتف مسجل من قبل");

    //City
    if (!(await CityModel.findOne({ _id: +city })))
      errors.push("يرجي اختيار مدينة من المسجلين لدينا في الموقع");

    //Password
    if (password != passwordConfirm)
      errors.push("يجب أن تكون كلمة المرور وتأكيد كلمة المرور متطابقان");
    if (password.length < 6)
      errors.push("يجب أن تحتوي كلمة المرور علي 6 أحرف علي الأقل");

    //Email
    if (!emailValidator.validate(email))
      errors.push("هذا البريد الالكتروني غير صالح");

    if (errors.length == 0) {
      //hash password
      password = await bcrypt.hash(password, 10);

      const user = {
        type,
        username,
        email,
        name,
        region,
        city,
        phone,
        password,
      };

      return {
        status: true,
        user,
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
