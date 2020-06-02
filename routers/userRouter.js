const router = require("express").Router();

const {
  createUser,
  getUser,
  updateUser,
} = require("../controllers/userControllers");
const { auth } = require("../controllers/authControllers");

router.route("/").post(createUser);
router.route("/profile").get(auth, getUser).put(auth, updateUser);

module.exports = router;
