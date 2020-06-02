const User = require("../models/user");
const { updateOne } = require("../controllers/factories");

exports.createUser = async function (req, res, next) {
  try {
    const { name, email, password, address, dob, gender } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      address,
      dob,
      gender,
    });
    return res.status(201).json({ status: "success", data: user });
  } catch (err) {
    return res.status(400).json({ status: "fail", error: err.message });
  }
};

exports.getUser = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.user.email });
    return res.status(200).json({ status: "success", data: user });
  } catch (err) {
    return res.status(404).json({ status: "fail", error: err.message });
  }
};

exports.updateUser = updateOne(User);
