const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const API_KEY = process.env.GEMINI_API_KEY;

router.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text:
                  `You are an AI assistant limited to educational use only. ` +
                  `Only answer queries related to academic subjects (science, math, programming, history, etc.). ` +
                  `If the user asks personal, entertainment, or unrelated questions, politely decline.`
              },
            ],
          },
          {
            role: "user",
            parts: [{ text: message }],
          },
        ],
      }
    );

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    res.json({ reply });
  } catch (err) {
    console.error("Gemini error:", err.response?.data || err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
