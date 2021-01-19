// @ts-nocheck
const express = require("express");
const router = express.Router();
const PeiceRequestModel = require("../../models/PeiceRequest");
const validation = require("../../validation/peiceRequest");

router.post("/", async (req, res) => {
  try {
    const peiceRequest = req.body;

    //Validation
    const validatePeiceRequest = await validation(peiceRequest);
    if (!validatePeiceRequest.status) {
      return res.json(validatePeiceRequest);
    }

    //Check if user is logged in
    if (!req.user) {
      return res.json({
        status: false,
        errors: ["يجب تسجيل الدخول أولا لكي تتمكن من اضافة طلب جديد"],
      });
    }

    /********************************************************/

    //Save the peice request to DB
    const savePeiceRequest = await PeiceRequestModel.create({
      ...validatePeiceRequest.peiceRequest,
      status: 1,
      userId: req.user._id,
    });

    if (!savePeiceRequest) {
      return res.json({
        status: false,
        errors: ["حدث خطأ غير متوقع ، يرجي المحاولة فيما بعد"],
      });
    }

    /********************************************************/

    return res.json({
      status: true,
      messages: ["تم اضافة طلبك بنجاح"],
      data: savePeiceRequest,
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
