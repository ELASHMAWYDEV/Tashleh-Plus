// @ts-nocheck
const express = require("express");
const router = express.Router();
const CarTypeModel = require("../models/CarType");

router.post("/add", async (req, res) => {
  try {
    const carType = req.body;

    //Check for permissions to add aonther admin
    if (!(req.user && req.user.type == 1)) {
      return res.json({
        status: false,
        errors: ["ليس لديك صلاحية الوصول الي هذه البيانات"],
      });
    }

    //Validation
    if (!carType.name)
      return res.json({
        status: false,
        errors: ["يجب كتابة نوع السيارة"],
      });

    if (!Array.isArray(carType.models) || carType.models.length == 0) {
      return res.json({
        status: false,
        errors: ["يجب اضافة ماركة واحدة علي الأقل"],
      });
    }

    //Check if exists before
    if (await CarTypeModel.findOne({ name: carType.name }))
      return res.json({
        status: false,
        errors: ["نوع السيارة موجود من قبل"],
      });

    //Save the carType
    const saveCarType = await CarTypeModel.create({
      name: carType.name,
      models: carType.models,
    });

    if (!saveCarType)
      return res.json({
        status: false,
        errors: ["حدثت مشكلة اثناء اضافة نوع السيارة"],
      });

    return res.json({
      status: true,
      messages: ["تم اضافة نوع السيارة بنجاح"],
      data: saveCarType,
    });

    /********************************************************/
  } catch (e) {
    console.log(`Error in /carTypes/add, error: ${e.message}`, e);
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
    const carType = req.body;

    //Check for permissions to add aonther admin
    if (!(req.user && req.user.type == 1)) {
      return res.json({
        status: false,
        errors: ["ليس لديك صلاحية الوصول الي هذه البيانات"],
      });
    }

    //Validation
    if (!carType._id)
      return res.json({
        status: false,
        errors: ["يجب اختيار نوع السيارة التي تريد حذفها"],
      });

    //Check if exists before
    if (!(await CarTypeModel.findOne({ _id: carType._id })))
      return res.json({
        status: false,
        errors: ["نوع السيارة هذا غير مسجلة من قبل"],
      });

    //delete the carType
    const deleteCarType = await CarTypeModel.deleteOne({ _id: carType._id });

    if (!deleteCarType)
      return res.json({
        status: false,
        errors: ["حدثت مشكلة اثناء حذف نوع السيارة"],
      });

    return res.json({
      status: true,
      messages: ["تم حذف نوع السيارة بنجاح"],
    });

    /********************************************************/
  } catch (e) {
    console.log(`Error in /carType/delete, error: ${e.message}`, e);
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
      const carTypeSearch = await CarTypeModel.findOne({ _id: req.body._id });
      if (carTypeSearch) {
        data.push(carTypeSearch);
      } else {
        return res.json({
          status: false,
          errors: ["لا يوجد نوع سيارة بهذا الاسم"],
        });
      }
    } else {
      data = [...(await CarTypeModel.find({}))];
      if (data.length == 0)
        return res.json({
          status: false,
          errors: ["لا يوجد أنواع سيارات لعرضها"],
        });
    }

    return res.json({
      status: true,
      data,
    });

    /********************************************************/
  } catch (e) {
    console.log(`Error in /carTypes/get, error: ${e.message}`, e);
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
    const carType = req.body;

    //Check for permissions to add aonther admin
    if (!(req.user && req.user.type == 1)) {
      return res.json({
        status: false,
        errors: ["ليس لديك صلاحية الوصول الي هذه البيانات"],
      });
    }

    //Validation
    if (!carType._id)
      return res.json({
        status: false,
        errors: ["يجب اختيار نوع السيارة التي تريد تعديلها"],
      });

    if (!carType.name)
      return res.json({
        status: false,
        errors: ["يجب كتابة الاسم الجديد لنوع السيارة"],
      });

    if (!Array.isArray(carType.models) || carType.models.length == 0) {
      return res.json({
        status: false,
        errors: ["يجب اضافة ماركة واحدة علي الأقل"],
      });
    }

    //Check if exists before
    if (await CarTypeModel.findOne({ name: carType.name }))
      return res.json({
        status: false,
        errors: ["نوع السيارة هذا مسجل من قبل"],
      });

    //Update the carType
    await CarTypeModel.updateOne(
      { _id: carType._id },
      { name: carType.name, models: carType.models }
    );

    //Get the new data
    const carTypeSearch = await CarTypeModel.findOne({ _id: carType._id });

    return res.json({
      status: true,
      messages: ["تم تعديل نوع السيارة بنجاح"],
      data: carTypeSearch,
    });

    /********************************************************/
  } catch (e) {
    console.log(`Error in /carType/edit, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

module.exports = router;
