const express = require("express");
const router = express.Router();

//Routes
router.use("/auth", require("./auth/index"));
router.use("/peicesRequests", require("./peicesRequests/index"));
router.use("/carTypes", require("./carTypes"));
router.use("/city", require("./city"));

module.exports = router;
