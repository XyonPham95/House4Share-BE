const Review = require("../models/review");
const Product = require("../models/product");
const { updateOne, deleteOne } = require("../controllers/factories");
const catchAsync = require("../utils/catchAsync");

exports.createReview = catchAsync(async function (req, res) {
  const product = await Product.findById(req.params.pId).populate(
    "comments.user"
  );
  console.log(product);
  product.comments.push({ review: req.body.review, user: req.user._id });
  await product.save({ validateBeforeSave: false });
  return res.status(201).json({ status: "success", data: product });
});

exports.getReviews = catchAsync(async function (req, res) {
  const reviews = await Review.find({ product: req.params.pId });
  return res.status(200).json({ status: "success", data: reviews });
});

exports.getSingleReview = catchAsync(async function (req, res) {
  const review = await Review.findOne({
    user: req.user.name,
    product: req.params.pId,
    _id: req.params.rId,
  });
  return res.status(200).json({ status: "success", data: review });
});

exports.updateReview = updateOne(Review);
exports.deleteReview = deleteOne(Review);
