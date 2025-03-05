const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please provide rating"],
  },
  title: {
    type: String,
    maxlength: 100,
    trim: true,
    required: [true, "Please provide review title"],
  },
  comment: {
    type: String,
    required: [true, "Please provide review comment "],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    required:true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    required:true
  },
  
});

ReviewSchema.index({product:1, user:1}, {unique:true})

module.exports = mongoose.model("Review", ReviewSchema);
