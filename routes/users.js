import express from "express";
import mongoose from "mongoose";
import Users from "../mongodb/Users.js";
import * as controller from "../controllers/usersController.js";
import "dotenv/config";

const { DB_USERNAME, DB_PASSWORD } = process.env;
const MONGODB_LINK = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@mahmoud-shihab-capstone.9gqxi.mongodb.net/character_sheets?retryWrites=true&w=majority&appName=mahmoud-shihab-capstone`;
mongoose.connect(MONGODB_LINK);

const router = express.Router();

router.route("/").get(controller.getUsers).post(controller.createNewUser);
router
    .route("/:id")
    .get(controller.getUserByID)
    .delete(controller.deleteUserByID)
    .post(controller.updateUserByID);
export default router;
