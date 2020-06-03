const passport = require("passport");

exports.loginFacebook = passport.authenticate("facebook", { scope: ["email"] });

exports.facebookAuth = function (req, res, next) {
  passport.authenticate("facebook", function (err, user) {
    if (err) return res.redirect("https://house4share.netlify.app/login");
    return res.redirect(
      `https://house4share.netlify.app/?token=${user.token[user.token.length - 1]}`
    );
  })(req, res, next);
};
