const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  street: { type: String, default: "" },
  city: { type: String, default: "" },
  postCode: { type: String, default: "" }
});

const PersonSchema = new mongoose.Schema({
  firstName: { type: String, default: "", trim: true },
  lastName: { type: String, default: "", trim: true },
  age: { type: Number, default: 0 },
  address: [AddressSchema]
});

module.exports = mongoose.model("Person", PersonSchema);
