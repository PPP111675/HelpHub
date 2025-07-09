const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByEmail, updateUserProfile } = require('../models/userModel');
require('dotenv').config();

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};


router.get('/getprofile', authMiddleware, async (req, res) => {
  try {
    const user = await findUserByEmail(req.user.email);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const { name, email, university_id } = user;
    res.json({ name, email, universityId: university_id });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

router.put('/updateprofile', authMiddleware, async (req, res) => {
  try {
    const { name, universityId } = req.body;

    const updated = await updateUserProfile(req.user.email, { name, universityId });
    if (!updated) return res.status(400).json({ message: 'Update failed.' });

    res.json({ name, email: req.user.email, universityId });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
