const Review = require("../models/review");
const { updateOne, deleteOne } = require("../controllers/factories");
const catchAsync = require("../utils/catchAsync");

exports.createReview = catchAsync(async function (req, res) {
  console.log(req.user.name);
  const review = await Review.create({
    ...req.body,
    product: req.params.pId,
    user: req.user._id,
  });
  return res.status(201).json({ status: "success", data: review });
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
