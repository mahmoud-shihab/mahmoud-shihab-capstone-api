import mongoose from "mongoose";
import Sheets from "../mongodb/Sheets.js";

/* -------------------------------------------------------------------------- */
/*                                 Root Route                                 */
/* -------------------------------------------------------------------------- */

/* ----------------------------------- GET ---------------------------------- */
export async function getSheets(_req, res) {
    try {
        const sheets = await Sheets.find().exec();
        return res.status(200).json(
            sheets.map(({ _id, user, sheet_name }) => ({
                _id,
                user,
                sheet_name,
            }))
        );
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving sheets." });
    }
}

/* ---------------------------------- POST ---------------------------------- */
export async function createNewSheet(req, res) {
    try {
        const body = req.body;
        if (Object.keys(body).length !== 3) {
            return res.status(400).json({
                message: "Incomplete or Incorrect POST body",
                requiredProperties: ["user", "sheet_name", "character_sheet"],
            });
        }
        const keys_test =
            body.hasOwnProperty("user") &&
            body.hasOwnProperty("sheet_name") &&
            body.hasOwnProperty("character_sheet");
        if (!keys_test) {
            return res.status(400).json({
                message: "Incomplete or Incorrect POST body",
                requiredProperties: ["user", "sheet_name", "character_sheet"],
            });
        }
        const sheet = await Sheets.create(body);
        return res.status(201).json({
            message: `${sheet.sheet_name}'s Character Sheet id: ${sheet._id} created`,
            savedItem: {
                _id: sheet._id,
                user: sheet.user,
                sheet_name: sheet.sheet_name,
                character_sheet: sheet.character_sheet,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: "Error creating new sheet." });
    }
}

/* -------------------------------------------------------------------------- */
/*                             Sheet By ID Routes                             */
/* -------------------------------------------------------------------------- */

/* ----------------------------------- GET ---------------------------------- */
export async function getSheetByID(req, res) {
    const sheetID = req.params.id;
    try {
        const sheet = await Sheets.findById(sheetID).exec();
        if (!sheet) {
            return res
                .status(404)
                .json({ message: `Character Sheet id: ${sheetID} not found` });
        }
        return res.status(200).json(sheet);
    } catch (error) {
        return res.status(500).json({
            message: `Error retrieving character sheet id: ${sheetID}`,
        });
    }
}

/* --------------------------------- DELETE --------------------------------- */
export async function deleteSheetByID(req, res) {
    const sheetID = req.params.id;
    try {
        const sheet = await Sheets.findById(sheetID).exec();
        if (!sheet) {
            return res
                .status(404)
                .json({ message: `Character Sheet id: ${sheetID} not found` });
        }
        const deleted_sheet = await Sheets.deleteOne({ _id: sheetID }).exec();
        return res.status(200).json({
            message: `${sheet.sheet_name} Character Sheet id: ${sheetID} deleted`,
        });
    } catch (error) {
        return res.status(500).json({
            message: `Error deleting character sheet id: ${sheetID}`,
        });
    }
}

/* ---------------------------------- POST ---------------------------------- */
export async function updateSheetByID(req, res) {
    const body = req.body;
    const sheetID = req.params.id;
    try {
        if (Object.keys(body).length !== 1) {
            return res.status(400).json({
                message: "Incomplete or Incorrect POST body",
                requiredProperties: ["character_sheet"],
            });
        }
        if (!Object.keys(body).includes("character_sheet")) {
            return res.status(400).json({
                message: "Incomplete or Incorrect POST body",
                requiredProperties: ["character_sheet"],
            });
        }
        const sheet = await Sheets.findById(sheetID).exec();
        if (!sheet) {
            return res
                .status(404)
                .json({ message: `Character Sheet id: ${sheetID} not found` });
        }
        sheet.character_sheet = body.character_sheet;
        await sheet.save();
        return res.status(200).json({
            message: `${sheet.sheet_name}'s Character Sheet id: ${sheetID} updated`,
            savedItem: sheet.character_sheet,
        });
    } catch (error) {
        return res.status(500).json({
            message: `Error updating character sheet id: ${sheetID}`,
        });
    }
}

/* -------------------------------------------------------------------------- */
/*                           Sheet By UserID Routes                           */
/* -------------------------------------------------------------------------- */

/* ----------------------------------- GET ---------------------------------- */
export async function getSheetsByUserID(req, res) {
    const userID = req.params.id;
    try {
        const sheets = await Sheets.find({ user: userID }).exec();
        return res.status(200).json(
            sheets.map(({ _id, user, sheet_name }) => ({
                _id,
                user,
                sheet_name,
            }))
        );
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving sheets." });
    }
}
