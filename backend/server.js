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

// CORS configuration - must be before routes
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'http://localhost:3000',
      'https://localhost:3000',
      'https://job-vista-frontend.vercel.app'
    ];
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));


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
