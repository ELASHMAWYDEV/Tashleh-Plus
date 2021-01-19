// @ts-nocheck
const express = require("express");
const router = express.Router();
const CityModel = require("../../models/City");

router.post("/add", async (req, res) => {
  try {
    const city = req.body;

    //Check for permissions to add aonther admin
    if (!(req.user && req.user.type == 1)) {
      return res.json({
        status: false,
        errors: ["ليس لديك صلاحية الوصول الي هذه البيانات"],
      });
    }

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
      data: saveCity,
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

/*
 *
 *
 */

router.post("/delete", async (req, res) => {
  try {
    const city = req.body;

    //Check for permissions to add aonther admin
    if (!(req.user && req.user.type == 1)) {
      return res.json({
        status: false,
        errors: ["ليس لديك صلاحية الوصول الي هذه البيانات"],
      });
    }

    //Validation
    if (!city._id)
      return res.json({
        status: false,
        errors: ["يجب اختيار المدينة التي تريد حذفها"],
      });

    //Check if exists before
    if (!(await CityModel.findOne({ name: city.name })))
      return res.json({
        status: false,
        errors: ["هذه المدينة غير مسجلة من قبل"],
      });

    //Save the city
    const deleteCity = await CityModel.deleteOne({ _id: city._id });

    if (!deleteCity)
      return res.json({
        status: false,
        errors: ["حدثت مشكلة اثناء حذف المدينة"],
      });

    return res.json({
      status: true,
      messages: ["تم حذف المدينة بنجاح"],
    });

    /********************************************************/
  } catch (e) {
    console.log(`Error in /city/delete, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

/*
 *
 *
 */

router.post("/get", async (req, res) => {
  try {
    let data = [];

    if (req.body._id) {
      const city = await CityModel.findOne({ _id: req.body._id });
      if (city) {
        data.push(city);
      } else {
        return res.json({
          status: false,
          errors: ["لا يوجد مدينة بهذا الاسم"],
        });
      }
    } else {
      data = [...(await CityModel.find({}))];
      if (data.length == 0)
        return res.json({
          status: false,
          errors: ["لا يوجد مدن لعرضها"],
        });
    }

    return res.json({
      status: true,
      data,
    });

    /********************************************************/
  } catch (e) {
    console.log(`Error in /city/get, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

/*
 *
 *
 */

router.post("/edit", async (req, res) => {
  try {
    const city = req.body;

    //Check for permissions to add aonther admin
    if (!(req.user && req.user.type == 1)) {
      return res.json({
        status: false,
        errors: ["ليس لديك صلاحية الوصول الي هذه البيانات"],
      });
    }

    //Validation
    if (!city._id)
      return res.json({
        status: false,
        errors: ["يجب اختيار المدينة التي تريد حذفها"],
      });

    if (!city.name)
      return res.json({
        status: false,
        errors: ["يجب كتابة الاسم الجديد للمدينة"],
      });

    //Check if exists before
    if (await CityModel.findOne({ name: city.name }))
      return res.json({
        status: false,
        errors: ["هذا الاسم مسجل من قبل"],
      });

    //Update the city
    await CityModel.updateOne({ _id: city._id }, { name: city.name });

    //Get the new data
    const citySearch = await CityModel.findOne({ _id: city._id });

    return res.json({
      status: true,
      messages: ["تم تعديل المدينة بنجاح"],
      data: citySearch,
    });

    /********************************************************/
  } catch (e) {
    console.log(`Error in /city/edit, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

module.exports = router;
