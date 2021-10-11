const mongoose = require("mongoose");

const SignupData = mongoose.Schema({
  name: String,
  email: String,
  password:String
});

module.exports = mongoose.model("SignupData",SignupData)