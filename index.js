const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL)
    .then(() => console.log("DB connection successful"))
    .catch((err) => console.log(err));

app.get("/api/test", () => console.log("Test is sucessful"));

app.listen(process.env.PORT || 5000, () => {
    console.log("Background server is running!")
});

