const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name cannot be empty"],
      maxlength: [100, "Name cannot be more thane 100 cahracters"],
    },
    description: {
      type: String,
      required: [true, "description cannot be empty"],
      maxlength: [1000, "description cannot be more thane 100 cahracters"],
    },
    image: {
      type: String,
      required: [true, "image cannot be empty"],
    },
    price: {
      type: Number,
      required: [true, "price cannot be empty"],
      default: 0,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: [true, "Please provide category"],
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: [true, "Please provide company"],
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{VALUE} not supported",
      },
    },
    colors: {
      type: [String],
      required: [true, "Please provide product color"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    averageRating: {
      type: Number,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
