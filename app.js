const express = require("express");

const bodyParser = require("body-parser");

const authRouter = require("./routes/auth");
const privateRouter = require("./routes/private");


const mongoose = require("mongoose");

const dotenv = require("dotenv");

const app = express();
app.use(bodyParser.json())
dotenv.config();

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("DB connected");
  }
);
app.use(express.json())
app.use("/api/user", authRouter);
app.use("/api/posts", privateRouter);

app.listen(3000, () => {
  console.log("Server running");
});
