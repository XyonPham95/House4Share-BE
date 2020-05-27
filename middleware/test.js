const Category = require("../models/category");
const Product = require("../models/product");
const Review = require("../models/review");

exports.checkCategory = async function (req, res, next) {
  if (!req.params.cId || !(await Category.exists({ _id: req.params.cId })))
    return res
      .status(400)
      .json({ status: "fail", message: "Category not exits" });
  next();
};

exports.checkProduct = async function (req, res, next) {
  if (!req.params.pId || !(await Product.exists({ _id: req.params.pId })))
    return res
      .status(400)
      .json({ status: "fail", message: "Product not found" });
  next();
};

exports.checkReview = async function (req, res, next) {
  if (!req.params.rId || !(await Review.exists({ _id: req.params.rId })))
    return res
      .status(400)
      .json({ status: "fail", message: "Review not found" });
  next();
};
