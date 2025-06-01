// video 21
const express = require("express");
const { handlegenerateNewShortURL, handleGetAnalytics, } = require("../controller/url");
const router = express.Router();

router.post("/", handlegenerateNewShortURL);
router.get("/analytics/:shortId", handleGetAnalytics); // video 21

module.exports = router;