const express = require("express");
const router = express.Router();


//Routes
router.use("/auth", require("./auth/index"));
router.use("/admin", require("./admin/index"));






module.exports = router;