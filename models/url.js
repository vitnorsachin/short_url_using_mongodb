const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(  // video 21
  {
    shortId: {
      type: String,
      require: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      require: true,
    },
    visitHistory: [ { timestamp: { type: Number } }],
    createBy: { 
      type: mongoose.Schema.Types.ObjectId, ref: "users" 
    },
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema); 
module.exports = URL; 