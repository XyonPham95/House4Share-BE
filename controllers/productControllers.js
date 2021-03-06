const Product = require("../models/product");
const Category = require("../models/category");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { updateOne, deleteOne } = require("../controllers/factories");

exports.createProduct = catchAsync(async function (req, res) {
  const product = await Product.create({ ...req.body, owner: req.user._id });
  console.log(product);
  return res.status(201).json({ status: "success", data: product });
});

exports.updateProduct = updateOne(Product);

exports.deleteProduct = deleteOne(Product);

exports.getProducts = catchAsync(async function (req, res, next) {
  const filters = { ...req.query };
  const paginationKeys = ["limit", "page", "sort"];
  paginationKeys.map((el) => delete filters[el]);

  const sortBy = req.query.sort;

  const page = req.query.page * 1;
  const limit = req.query.limit * 1;
  const skip = (page - 1) * limit;
  const products = await Product.find(filters).skip(skip).limit(limit).sort(req.query.sort);
  const countProducts = await Product.find(filters).countDocuments();
  return res
    .status(200)
    .json({ status: "success", data: products, total: countProducts });
});

exports.getSingleProduct = catchAsync(async function (req, res) {
  const id = req.params.pId;
  const product = await Product.findById(id).populate("comments.user");
  if (!product) throw new Error("product not found");
  return res.status(200).json({ status: "success", data: product });
});

exports.getByCategory = catchAsync(async function (req, res, next) {
  const filters = { ...req.body };
  const paginationKeys = ["limit", "page", "sort"];
  paginationKeys.map((el) => delete filters[el]);


  const sortBy = req.query.sort;

  const page = req.query.page * 1;
  const limit = req.query.limit * 1;
  const skip = (page - 1) * limit;
  const countProducts = await Product.find(filters).countDocuments();
  if (req.query.page && skip > countProducts)
    return next(new AppError(400, "Page number out of range"));
  const products = await Category.findById(req.params.cId).populate({
    path: "products",
    options: {
      limit: limit,
      skip: skip,
      sort: sortBy,
    },
  });
  return res
    .status(200)
    .json({ status: "success", data: products, countProducts: countProducts });
});
