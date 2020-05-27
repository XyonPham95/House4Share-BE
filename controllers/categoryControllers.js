const Category = require("../models/category");

exports.createCategory = async function (req, res) {
  const { category } = req.body;
  try {
    const newCategory = await Category.create({ category });
    return res.status(201).json({ status: "success", data: newCategory });
  } catch (err) {
    return res.status(400).json({ status: "fail", error: err.message });
  }
};

exports.getCategory = async function (req, res) {
  try {
    const categorys = await Category.find({});
    return res.status(200).json({ status: "success", data: categorys });
  } catch (err) {
    return res.status(400).json({ status: "fail", error: err.message });
  }
};

exports.updateCategory = async function (req, res) {
  const id = req.params.cId;
  try {
    const newCategory = await Category.findOneAndUpdate(
      { _id: id },
      { category: req.body.category },
      { new: true }
    );
    return res.status(202).json({ status: "success", data: newCategory });
  } catch (err) {
    return res.status(400).json({ status: "fail", error: err.message });
  }
};

exports.deleteCategory = async function (req, res) {
  const id = req.params.cId;
  try {
    await Category.findByIdAndDelete(id);
    return res.status(204).json({ status: "success", data: null });
  } catch (err) {
    return res.status(400).json({ status: "fail", error: err.message });
  }
};
