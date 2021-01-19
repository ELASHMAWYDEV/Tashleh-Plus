// @ts-nocheck
const express = require("express");
const router = express.Router();
const CityModel = require("../../models/City");

router.post("/add", async (req, res) => {
  try {
    const city = req.body;

    //Check for permissions to add aonther admin
    // if (!(req.user && req.user.type == 1) && validateUser.type == 1) {
    //   return res.json({
    //     status: false,
    //     errors: ["ليس لديك صلاحية الوصول الي هذه البيانات"],
    //   });
    // }

    //Validation
    if (!city.name)
      return res.json({
        status: false,
        errors: ["يجب كتابة اسم المدينة التي تريد اضافتها"],
      });

    //Check if exists before
    if (await CityModel.findOne({ name: city.name }))
      return res.json({
        status: false,
        errors: ["هذه المدينة مسجلة من قبل"],
      });

    //Save the city
    const saveCity = await CityModel.create({ name: city.name });

    if (!saveCity)
      return res.json({
        status: false,
        errors: ["حدثت مشكلة اثناء اضافة المدينة"],
      });

    return res.json({
      status: true,
      messages: ["تم اضافة المدينة بنجاح"],
      city: saveCity,
    });

    /********************************************************/
  } catch (e) {
    console.log(`Error in /city/add, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});
router.post("/delete", (req, res) => {});
router.post("/get", (req, res) => {});
router.post("/edit", (req, res) => {});

module.exports = router;
