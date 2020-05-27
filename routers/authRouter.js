const router = require("express").Router();
const {
  login,
  logout,
  logoutAll,
  auth,
} = require("../controllers/authControllers");
const { loginFacebook, facebookAuth } = require("../auth/facebookHandler");
const { loginGoogle, googleAuth } = require("../auth/googleHandler");
const { loginGithub, githubAuth } = require("../auth/githubHandler");

router.get("/facebook", loginFacebook);
router.get("/facebook/authorized", facebookAuth);
router.get("/google", loginGoogle);
router.get("/google/authorized", googleAuth);
router.get("/github", loginGithub);
router.get("/github/authorized", githubAuth);
router.route("/login").post(login);
router.route("/logout").get(auth, logout);
router.route("/logoutAll").get(auth, logoutAll);

module.exports = router;
