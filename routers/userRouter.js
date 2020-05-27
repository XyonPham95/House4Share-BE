const router = require("express").Router();

const { createUser, getUser } = require("../controllers/userControllers");
const { auth } = require("../controllers/authControllers");

router.route("/").post(createUser);
router.route("/me").get(auth, getUser);

module.exports = router;
