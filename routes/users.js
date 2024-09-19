import express from "express";
import mongoose from "mongoose";
import Users from "../mongodb/Users.js";
import "dotenv/config";

const { DB_USERNAME, DB_PASSWORD } = process.env;
const MONGODB_LINK = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@mahmoud-shihab-capstone.9gqxi.mongodb.net/character_sheets?retryWrites=true&w=majority&appName=mahmoud-shihab-capstone`;
mongoose.connect(MONGODB_LINK);

const router = express.Router();

router.route("/").get(async (_req,res)=>{
    const users = await Users.find().exec()
    // const users = await Users.findById("66e1c70685f3d12a4a71028c").exec()
    res.json(users);
})

export default router;

