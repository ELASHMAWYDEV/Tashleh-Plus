// @ts-nocheck
const express = require("express");
const router = express.Router();
const UserModel = require("../../models/User");
const validation = require("../../validation/auth/register");
const { createToken } = require("../../helpers/jwt");

router.post("/", async (req, res) => {
  try {
    const user = req.body;

    //Validation
    const validateUser = await validation(user);
    if (!validateUser.status) {
      return res.json(validateUser);
    }

    //Check for permissions to add aonther admin
    if (!(req.user && req.user.type == 1) && validateUser.user.type == 1) {
      return res.json({
        status: false,
        errors: ["لا يمكنك اضافة مشرفين"],
      });
    }

    /********************************************************/

    //Save the user to DB
    const saveUser = await UserModel.create(validateUser.user);
    if (!saveUser) {
      return res.json({
        status: false,
        errors: ["حدث خطأ غير متوقع ، يرجي المحاولة فيما بعد"],
      });
    }

    /********************************************************/

    //Send the jwt token with the success response
    const accessToken = await createToken({ _id: saveUser._id });
    return res.json({
      status: true,
      messages: ["تم التسجيل بنجاح"],
      accessToken,
    });

    /********************************************************/
  } catch (e) {
    console.log(`Error in /auth/register, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

module.exports = router;
