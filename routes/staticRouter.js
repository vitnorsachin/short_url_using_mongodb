const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {                       // video 22
  if (!req.user) return res.redirect("/login");
  const allurls = await URL.find({ createBy: req.user._id });
  return res.render("home", {
    urls: allurls,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
