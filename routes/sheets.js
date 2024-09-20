import express from "express";
import mongoose from "mongoose";
import Sheets from "../mongodb/Sheets.js";
import * as controller from "../controllers/sheetsController.js";
import "dotenv/config";

const { DB_USERNAME, DB_PASSWORD } = process.env;
const MONGODB_LINK = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@mahmoud-shihab-capstone.9gqxi.mongodb.net/character_sheets?retryWrites=true&w=majority&appName=mahmoud-shihab-capstone`;
mongoose.connect(MONGODB_LINK);

const router = express.Router();

router.route("/").get(controller.getSheets).post(controller.createNewSheet);

router
    .route("/:id")
    .get(controller.getSheetByID)
    .delete(controller.deleteSheetByID)
    .post(controller.updateSheetByID);

router.route("/user/:id").get(controller.getSheetsByUserID)

export default router;
