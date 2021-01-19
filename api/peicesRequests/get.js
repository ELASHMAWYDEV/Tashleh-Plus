// @ts-nocheck
const express = require("express");
const router = express.Router();
const PeiceRequestModel = require("../../models/PeiceRequest");

router.post("/", async (req, res) => {
  try {
    const peiceRequest = req.body;

    /********************************************************/

    let data = [];

    if (peiceRequest._id) {
      const peiceRequestSearch = await PeiceRequestModel.findOne({
        _id: peiceRequest._id,
      });
      if (peiceRequestSearch) {
        data.push(peiceRequestSearch);
      } else {
        return res.json({
          status: false,
          errors: ["لا يوجد طلب بهذا الرقم ، أو أن هذا الطلب لم يعد موجودا"],
        });
      }
    } else {
      const peiceRequest = await PeiceRequestModel.create({
        ...validatePeiceRequest.peiceRequest,
        status: 1,
        userId: req.user._id,
      });
    }

    if (data.length == 0) {
      return res.json({
        status: false,
        errors: ["لا يوجد طلبات بهذا "],
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
