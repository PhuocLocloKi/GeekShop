const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const passport = require('../config/passport');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/profile', auth, authController.getProfile);
router.put('/profile', auth, authController.updateProfile);
router.put('/password', auth, authController.changePassword);

// Check if OAuth integrations are configured in .env
const googleEnabled = process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET;
const facebookEnabled = process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET;

// Google OAuth
router.get('/google', (req, res, next) => {
  if (!googleEnabled) {
    console.warn("GOOGLE_CLIENT credentials not configured in server .env. Simulating mock authentication redirect...");
    req.user = {
      id: 3,
      name: 'Google Netrunner',
      email: 'google@geekshop.net',
      role: 'user',
      avatar_url: null,
    };
    return authController.oauthSuccess(req, res);
  }
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

router.get('/google/callback', (req, res, next) => {
  if (!googleEnabled) {
    return res.redirect('/login');
  }
  passport.authenticate('google', { failureRedirect: '/login', session: false })(req, res, next);
});

// Facebook OAuth
router.get('/facebook', (req, res, next) => {
  if (!facebookEnabled) {
    console.warn("FACEBOOK_CLIENT credentials not configured in server .env. Simulating mock authentication redirect...");
    req.user = {
      id: 4,
      name: 'Facebook Netrunner',
      email: 'facebook@geekshop.net',
      role: 'user',
      avatar_url: null,
    };
    return authController.oauthSuccess(req, res);
  }
  passport.authenticate('facebook', { scope: ['email'] })(req, res, next);
});

router.get('/facebook/callback', (req, res, next) => {
  if (!facebookEnabled) {
    return res.redirect('/login');
  }
  passport.authenticate('facebook', { failureRedirect: '/login', session: false })(req, res, next);
});

module.exports = router;
