import express from "express";
import Connection from "./database/db.js";
import Router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";
import DotEnv from "dotenv";

const app = express();
DotEnv.config();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", Router);
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server is running in port ${PORT}`));

const URL =
    "mongodb+srv://samarimam78:w4bCFhKWO9qVmDCO@cluster0.saxpk.mongodb.net/mernblog?retryWrites=true&w=majority";
Connection(process.env.MONGODB_URI || URL);
