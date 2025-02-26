const { StatusCodes } = require("http-status-codes");
const Product = require("../routes/product.route");

const getAllProduct = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};
const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
  res.send("get all product");
};
const getSingleProduct = async (req, res) => {
  res.send("get single product");
};

const updateProduct = async (req, res) => {
  res.send("get single product");
};

const deleteProduct = async (req, res) => {
  res.send("get single product");
};

const uploadImage = async (req, res) => {
  res.send("get single product");
};

module.exports = {
  getAllProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  uploadImage,
  createProduct,
};
