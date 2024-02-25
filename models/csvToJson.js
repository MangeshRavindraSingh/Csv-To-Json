const mongoose = require("mongoose");

const Name = mongoose.Schema({
  firstName: String,
  lastName: String,
  _id: false
});

const Address = mongoose.Schema({
  line1: String,
  line2: String,
  city: String,
  state: String,
  _id: false
});

const csvToJson = new mongoose.Schema(
  {
    name: {
      type: Name,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: Address,
      default: "",
    },
    additionalInfo: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("CsvToJson", csvToJson);
