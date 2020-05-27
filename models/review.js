const mongoose = require("mongoose");
const AppError = require("../utils/appError");

const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "product must have review"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "review must have owner"],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "review must have product"],
    },
    rating: {
      type: Number,
      required: [true, "Review needs a rating"],
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate("user", "_id name");
  next();
});

reviewSchema.statics.calculateAveRating = async function (productId) {
  const stats = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$product",
        ratingQuantity: { $sum: 1 },
        ratingAverage: { $avg: "$rating" },
      },
    },
  ]);

  await mongoose.model("Product").findByIdAndUpdate(productId, {
    ratingAverage: stats.length === 0 ? 0 : stats[0].ratingAverage,
    ratingQuantity: stats.length === 0 ? 0 : stats[0].ratingQuantity,
  });
};

reviewSchema.post("save", async function () {
  await this.constructor.calculateAveRating(this.product);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.doc = await this.findOne();
  if (!this.doc) return next(new AppError(404, "Review not found"));
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.doc.constructor.calculateAveRating(this.doc.product);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
