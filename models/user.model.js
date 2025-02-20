const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const UserScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});
UserScheme.pre('save', async function () {
    
})
module.exports = mongoose.model("User", UserScheme);
