import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
import { ConnectedDatabase } from "./config/database.js";

dotenv.config();
const app = express();
const port = process.env.PORT

// database connections
ConnectedDatabase()

app.use(cookieParser())
app.use(cors())
app.use(express.json())




app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})



