const mongoose = require("mongoose");
const validator = require("validator");

const data = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    // validate(item){
    //   if (! validator.isEmail(item)) {
    //     throw new Error("Enter Valid Email Address...")
    //   }
    // }
  },
  number: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("Crud_data", data);
