const express = require("express");
const router = express.Router();

router.use("/add", require("./add"));
router.use("/get", require("./get"));

module.exports = router;
