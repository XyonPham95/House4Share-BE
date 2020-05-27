const passport = require("passport");

exports.loginGithub = passport.authenticate("github", {
  scope: ["user:email"],
});

exports.githubAuth = function (req, res, next) {
  passport.authenticate("github", function (err, user, info) {
    if (err) return res.redirect(`https://localhost:3000/login`);

    return res.redirect(
      `https://localhost:3000/?token=${user.token[user.token.length - 1]}`
    );
  })(req, res, next);
};
