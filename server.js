import express from "express";
import cors from "cors";
import "dotenv/config";
import sheetRouter from "./routes/sheets.js";
import userRouter from "./routes/users.js";

const app = express();
const { PORT, CORS_ORIGIN } = process.env;

app.use(express.json());
app.use(cors(CORS_ORIGIN));
app.use(express.static("public"));

app.use("/api/v1/sheets",sheetRouter); 
app.use("/api/v1/users",userRouter); 

app.listen(PORT, () => {
    console.log(`App running on PORT: http://localhost:${PORT}/`);
});

JSON.stringify