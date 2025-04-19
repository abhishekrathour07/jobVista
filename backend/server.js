import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ConnectedDatabase } from "./config/database.js";
import authRouter from "./routes/authRoutes.js";

dotenv.config();
const app = express();
const port = 4050;

// Connect to DB
ConnectedDatabase();

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is working!");
});

// Routes
app.use("/api/v1/auth", authRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
