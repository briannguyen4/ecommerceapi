const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://briannguyen4:mongodb@cluster0.uw4jp.mongodb.net/shop?retryWrites=true&w=majority")

app.listen(5000, () => {
    console.log("Background server is running!")
});

