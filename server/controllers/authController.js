const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar_url: user.avatar_url,
    },
    process.env.JWT_SECRET || 'super_secret_key',
    { expiresIn: '7d' }
  );
};

const authController = {
  register: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      const existingUser = await userModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Register error: Email already registered.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = await userModel.create({
        name,
        email,
        password: hashedPassword,
      });

      const user = { id: userId, name, email, role: 'user', avatar_url: null };
      const token = generateToken(user);

      res.status(201).json({
        message: 'Registration successful.',
        token,
        user,
      });
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await userModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Authentication error: Invalid credentials.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Authentication error: Invalid credentials.' });
      }

      const token = generateToken(user);
      res.status(200).json({
        message: 'Authentication successful.',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar_url: user.avatar_url,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  getProfile: async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },

  updateProfile: async (req, res, next) => {
    try {
      const { name, avatarUrl } = req.body;
      await userModel.updateProfile(req.user.id, { name, avatarUrl });
      res.status(200).json({
        message: 'Profile updated successfully.',
        user: { name, avatar_url: avatarUrl },
      });
    } catch (err) {
      next(err);
    }
  },

  changePassword: async (req, res, next) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = await userModel.findByEmail(req.user.email);

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Verification error: Current password incorrect.' });
      }

      const hashedNew = await bcrypt.hash(newPassword, 10);
      await userModel.updatePassword(req.user.id, hashedNew);
      res.status(200).json({ message: 'Password updated successfully.' });
    } catch (err) {
      next(err);
    }
  },

  // OAuth success callback handler
  oauthSuccess: (req, res) => {
    // Passport saves oauth profile on req.user
    const token = generateToken(req.user);
    // Redirect back to frontend with token parameter
    res.redirect(`http://localhost:5173/login?token=${token}`);
  },
};

module.exports = authController;
