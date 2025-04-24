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

dotenv.config();
const app = express();
const port = 4050;

// Connect to DB
ConnectedDatabase();
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// this are the all routes 
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", authMiddleware, jobRouter)
app.use("/api/v1", authMiddleware, applicationRouter)
app.use("/api/v1", authMiddleware, profileRouter)
app.use("/api/v1", authMiddleware, savedRouter)

app.get("/", (req, res) => {
    res.send("API is working!");
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
