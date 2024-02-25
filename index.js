require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const csvToJsonRoutes = require("./routes/csvToJson");

const port = process.env.PORT || 5000;

// Connect to db
(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MONGO Connected");
  } catch (error) {
    console.log("Error connecting to MONGODB: ", error);
  }
})();

// Middlewares
app.use(bodyParser.json());
app.use(cors());
// TODO:use request logger here

// Routes
app.use("/api", csvToJsonRoutes);

// TODO:use error logger here
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
