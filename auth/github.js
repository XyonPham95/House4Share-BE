const passport = require("passport-github2");
const githubStrategy = passport.Strategy;
const User = require("../models/user");
const request = require("request");

module.exports = new githubStrategy(
  {
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: process.env.CLIENT_DOMAIN + process.env.GH_CB,
  },
  async function (accessToken, refreshToken, profile, cb) {
    let emailUser;

    if (!profile._json.email) {
      await request(
        {
          url: "https://api.github.com/user/emails",
          json: true,
          headers: {
            "user-agent": "my user-agent",
            authorization: `token ${accessToken}`,
          },
        },
        async (err, { body }) => {
          if (err) return console.log(err);

          emailUser = body[0].email;

          const user = await User.findOneOrCreate(profile.username, emailUser);

          return cb(null, user);
        }
      );
    }
  }
);
