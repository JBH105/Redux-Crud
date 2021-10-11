
const mongoose = require('mongoose')

const otpSchema =mongoose.Schema({
    _id: {
      type:mongoose.Schema.Types.ObjectId,
      ref: "SignupData",
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
  });
  module.exports = mongoose.model('OTP', otpSchema)