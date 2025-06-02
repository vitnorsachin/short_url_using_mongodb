const { nanoid } = require("nanoid");  
const URL = require("../models/url");  

async function handlegenerateNewShortURL(req, res) { // video 21
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required.!" });
  const shortID = nanoid(8);
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createBy: req.user._id,
  });
  return res.render("home", {                        // video 22
    id: shortID,
  });
}

async function handleGetAnalytics(req, res) { // video 21
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handlegenerateNewShortURL,
  handleGetAnalytics,
};