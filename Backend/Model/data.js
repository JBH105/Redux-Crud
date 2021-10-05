const mongoose = require("mongoose");

const data = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  number: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model('Crud_data',data)