const passport = require("passport");

exports.loginGoogle = passport.authenticate("google");

exports.googleAuth = function (req, res, next) {
  passport.authenticate("google", function (err, user) {
    if (err) return res.redirect("https://localhost:3000/login");
    return res.redirect(
      `https://localhost:3000/?token=${user.token[user.token.length - 1]}`
    );
  })(req, res, next);
};
