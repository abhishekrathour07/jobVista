import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ConnectedDatabase } from "./config/database.js";
import authMiddleware from "./middleware/AuthMiddlware.js";
import authRouter from "./routes/authRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import applicationRouter from "./routes/applicationRouter.js";
import profileRouter from "./routes/profileRoutes.js";
import savedRouter from "./routes/savedJobs.js";
import settingRouter from "./routes/settingRouter.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4050;

// Connect to DB
ConnectedDatabase();

// Middlewares
app.use(cookieParser());
app.use(express.json());

// Correct CORS setup
// const allowedOrigins = [
//  "http://localhost:3000",
//   "https://job-vista-frontend.vercel.app"
// ]; 

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));


// Routes
app.use("/api/v1", authRouter);
app.use("/api/v1", authMiddleware, jobRouter);
app.use("/api/v1", authMiddleware, applicationRouter);
app.use("/api/v1", authMiddleware, profileRouter);
app.use("/api/v1", authMiddleware, savedRouter);
app.use("/api/v1", authMiddleware, settingRouter);

// Default Route
app.get("/", (req, res) => {
  res.send("API is working fine!");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
