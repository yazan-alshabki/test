const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
app.use(express.json());
dotenv.config();
const userRoutes = require("./routes/user.js");
const bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

const LOCAL_DB = process.env.LOCAL_DB;
const PORT = process.env.PORT;

// ============================== connect to database ==============================
let connectPort = async (port) => {
    try {
        await mongoose.connect(LOCAL_DB);
        app.listen(port);
        console.log(`connect to database done at port ${port}!!`);
    } catch (err) {
        console.log(err);
    }
};
connectPort(PORT);

// user actions
app.use("/", userRoutes);




