const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    trim: true,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    minlength: 3,
    trim: true,
    unique: true,
    required: true,
  },
  password: String,
  phone: String,
  age: {
    type: Number,
    min: 12,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
