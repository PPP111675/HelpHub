import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import faqRoutes from "./routes/faq.routes.js";
import searchRoutes from "./routes/search.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import { triggerScraping } from './controllers/scraper.controller.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB error:", err));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/tickets", ticketRoutes);

// 🔧 Add this to trigger scraper
app.get("/api/scrape", triggerScraping);

export default app;
