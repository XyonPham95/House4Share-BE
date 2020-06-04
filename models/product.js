const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "product must have category"],
    },
    description: {
      type: String,
      required: [true, "product must have description"],
      minLength: 10,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "product must have owner"],
    },
    comments: [
      {
        review: {
          type: String,
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        date: {
          type: Date,
          default: new Date(),
        },
      },
    ],
    room: { type: Number },
    price: {
      type: Number,
      required: [true, "product must have price"],
      min: [0, "price must have atleast 0 dollar"],
    },
    image: {
      type: String,
      required: [true, "product must have image"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.pre(/^find/, function (next) {
  this.populate(
    "owner",
    "-password -__v -tokens -createdAt -updatedAt"
  ).populate("category", "_id category");
  next();
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
