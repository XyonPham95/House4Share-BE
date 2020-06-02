const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.updateOne = (Model) =>
  catchAsync(async function (req, res, next) {
    let allows = [];
    let id = req.params.id;
    switch (Model.modelName) {
      case "User":
        allows = ["password", "address", "dob", "gender"];
        id = req.user._id;
        break;
      case "Product":
        allows = ["title", "description", "price", "stock", "picture"];
        id = req.params.pId;
        break;
      case "Review":
        allows = ["review", "rating"];
        id = req.params.rId;
        break;
      default:
        allows = [];
        id = req.params.id;
    }
    Object.keys(req.body).forEach((el) => {
      if (!allows.includes(el)) {
        delete req.body[el];
      }
    });
    const newItem = await Model.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!newItem) {
      return next(new AppError(404, "Document not found"));
    }
    res.status(202).json({ status: "success", data: newItem });
  });

exports.deleteOne = (Model) =>
  catchAsync(async function (req, res) {
    let id;
    switch (Model.modelName) {
      case "Product":
        id = req.params.pId;
        break;
      case "Review":
        id = req.params.rId;
        break;
      default:
        id = req.params.id;
        break;
    }
    const doc = await Model.findOneAndDelete({ _id: id });
    if (!doc) {
      return next(new AppError(404, "There is no such item"));
    }
    res.status(204).end();
  });
