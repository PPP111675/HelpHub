
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

require('dotenv').config();

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.GMAIL_USER,
      subject: `New message from ${name}`,
      text: `Email: ${email}\n\n${message}`,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
