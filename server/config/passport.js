const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

// Standard user serialization
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Configure Google Strategy if client keys exist
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    // Process profile details and pass back
    const user = {
      name: profile.displayName,
      email: profile.emails[0].value,
      avatar_url: profile.photos[0]?.value || null,
      provider: 'google',
    };
    return done(null, user);
  }));
}

// Configure Facebook Strategy if client keys exist
if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/api/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails', 'photos'],
  },
  (accessToken, refreshToken, profile, done) => {
    const user = {
      name: profile.displayName,
      email: profile.emails?.[0]?.value || `${profile.id}@facebook.geekshop`,
      avatar_url: profile.photos?.[0]?.value || null,
      provider: 'facebook',
    };
    return done(null, user);
  }));
}

module.exports = passport;
