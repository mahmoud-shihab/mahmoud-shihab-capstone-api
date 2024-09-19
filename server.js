import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import sheetRouter from "./routes/sheets.js";
import userRouter from "./routes/users.js";

const app = express();
const { PORT, CORS_ORIGIN, DB_USERNAME, DB_PASSWORD } = process.env;
const MONGODB_LINK = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@mahmoud-shihab-capstone.9gqxi.mongodb.net/character_sheets?retryWrites=true&w=majority&appName=mahmoud-shihab-capstone`;
mongoose.connect(MONGODB_LINK);

app.use(express.json());
app.use(cors(CORS_ORIGIN));
app.use(express.static("public"));

app.use("/api/v1/sheets",sheetRouter); 
app.use("/api/v1/users",userRouter); 

app.listen(PORT, () => {
    console.log(`App running on PORT: http://localhost:${PORT}/`);
});
