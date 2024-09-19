import express from "express";
import mongoose from "mongoose";
import Sheets from "../mongodb/Sheets.js";
import "dotenv/config";

const { DB_USERNAME, DB_PASSWORD } = process.env;
const MONGODB_LINK = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@mahmoud-shihab-capstone.9gqxi.mongodb.net/character_sheets?retryWrites=true&w=majority&appName=mahmoud-shihab-capstone`;
mongoose.connect(MONGODB_LINK);

const router = express.Router();

router.route("/").get(async (_req,res)=>{
    const sheet = await Sheets.find().exec()
    // const sheet = await Sheets.findById("66eb3bb9faf44d1cb74b41ac").exec()
    res.json(sheet);
})

export default router;