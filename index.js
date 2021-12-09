const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

dotenv.config();

app.listen(process.env.PORT || 5000, () => {
    console.log("Background server is running!")
});

mongoose.connect(
    process.env.MONGO_URL)
    .then(() => console.log("DB connection successful"))
    .catch((err) => console.log(err));

// app.get('/', (req, res) => {
//     res.send('hi');
// })

// app.get("/api/test", () => console.log("Test is sucessful"));
app.use(express.json());

app.use('/api/users', userRoute);

app.use('/api/auth', authRoute);

