const express = require("express");
const router = express.Router();
const handleCsvToJson = require("../controller/csvToJson");

router.post("/csvToJson", handleCsvToJson);

module.exports = router;
