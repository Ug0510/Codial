const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new GoogleStrategy({
  clientID: "858715951029-t82tvb9j9qmc26db1gfslqchu46nnbtr.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:8000/users/auth/google/callback",
  passReqToCallback: true
},
async function (request, accessToken, refreshToken, profile, done) {
  try {
    // Find the user
    const user = await User.findOne({ email: profile.emails[0].value }).exec();

    // If found, set this user as req.user
    if (user) {
      return done(null, user);
    } else {
      // If not found, create the user and set it as req.user
      const newUser = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        password: crypto.randomBytes(20).toString('hex')
      });

      if (newUser) {
        return done(null, newUser);
      } else {
        return done(null, false, { message: 'Error creating user' });
      }
    }
  } catch (err) {
    console.error(err);
    return done(err);
  }
}
));
