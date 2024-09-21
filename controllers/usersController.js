import mongoose from "mongoose";
import { createHash } from "node:crypto";
import Users from "../mongodb/Users.js";
import "dotenv/config";

/* -------------------------------------------------------------------------- */
/*                                 Root Route                                 */
/* -------------------------------------------------------------------------- */

/* ----------------------------------- GET ---------------------------------- */
export async function getUsers(_req, res) {
    const users = await Users.find().exec();
    return res
        .status(200)
        .json(users.map(({ _id, name, email }) => ({ _id, name, email })));
}

/* ---------------------------------- POST ---------------------------------- */
export async function createNewUser(req, res) {
    try {
        let body = req.body;
        if (Object.keys(body).length !== 3) {
            return res.status(400).json({
                message: "Incomplete or Incorrect POST body",
                requiredProperties: ["name", "email", "password"],
            });
        }
        const keys_test =
            body.hasOwnProperty("name") &&
            body.hasOwnProperty("email") &&
            body.hasOwnProperty("password");
        if (!keys_test) {
            return res.status(400).json({
                message: "Incomplete or Incorrect POST body",
                requiredProperties: ["name", "email", "password"],
            });
        }
        const users = await Users.find().exec();
        if (users.some((user) => user.email === body.email)) {
            return res.status(400).json({ message: "User already exists" });
        }
        const passwordHash = (password) =>
            createHash(process.env.HASH)
                .update(`${password}${process.env.SALT}`)
                .digest("hex");
        console.log("created hash");
        body.password = passwordHash(body.password);
        const user = await Users.create(body);
        return res.status(201).json({
            message: `User ${user.name} created`,
            savedItem: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Error creating new user.", error: error });
    }
}

/* -------------------------------------------------------------------------- */
/*                              User By ID Routes                             */
/* -------------------------------------------------------------------------- */

/* ----------------------------------- GET ---------------------------------- */
export async function getUserByID(req, res) {
    const userID = req.params.id;
    try {
        const user = await Users.findById(userID).exec();
        if (!user) {
            return res
                .status(404)
                .json({ message: `User id: ${userID} not found` });
        }
        return res
            .status(200)
            .json({ _id: user._id, name: user.name, email: user.email });
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving user." });
    }
}

/* --------------------------------- DELETE --------------------------------- */
export async function deleteUserByID(req, res) {
    const userID = req.params.id;
    try {
        const user = await Users.findById(userID).exec();
        if (!user) {
            return res
                .status(404)
                .json({ message: `User id: ${userID} not found` });
        }
        const deleted_user = await Users.deleteOne({ _id: userID }).exec();
        return res.status(200).json({
            message: `${user.name} User id: ${userID} deleted`,
        });
    } catch (error) {
        return res.status(500).json({
            message: `Error deleting user id: ${userID}`,
        });
    }
}

/* ---------------------------------- POST ---------------------------------- */
export async function updateUserByID(req, res) {
    let body = req.body;
    const userID = req.params.id;
    try {
        if (Object.keys(body).length !== 3) {
            return res.status(400).json({
                message: "Incomplete or Incorrect POST body",
                requiredProperties: ["name", "email", "password"],
            });
        }
        const keys_test =
            body.hasOwnProperty("name") &&
            body.hasOwnProperty("email") &&
            body.hasOwnProperty("password");
        if (!keys_test) {
            return res.status(400).json({
                message: "Incomplete or Incorrect POST body",
                requiredProperties: ["name", "email", "password"],
            });
        }
        const user = await Users.findById(userID).exec();
        user.name = body.name;
        user.email = body.email;
        user.password = body.password;
        await user.save()
        return res.status(200).json({
            message: `${user.name} id: ${userID} updated`,
            savedItem: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: `Error updating user id: ${userID}`,
            error: error,
        });
    }
}
