const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth");

const PORT = 8001;
const { connectToMongoDB } = require("./connect"); 
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter"); // video 22
const userRoute = require("./routes/user");

connectToMongoDB("mongodb://localhost:27017/short-url") 
  .then(() => console.log("MongoDb connected..!"))
  .catch((err) => console.log("MongoDb Error: ", err));

app.set("view engine", "ejs");                       // video 22 step 2 (step 1 is install ejs)
app.set("views", path.resolve("./views"));           // video 22

app.use(express.json());
app.use(express.urlencoded({ extended: false }));    // video 22
app.use(cookieParser());

app.use("/", checkAuth, staticRoute);                // video 22
app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/user", userRoute);


app.get("/url/:shortId", async (req, res) => {      // video 21
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() }}}
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started : http://localhost:${PORT}/login`));