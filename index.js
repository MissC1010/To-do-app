const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.routes");
const todoRoutes = require("./routes/todo.routes");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const config = require("./config/config.json");

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || config.port;

app.use(express.static(path.resolve(__dirname, "./client/build")));

// All remaining requests return the React app, so it can handle routing.
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build"));
});

//The Routes
app.use("/api/users", userRoutes);
app.use("/api/todo", todoRoutes);

// MongoDB configuration
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING || config.mongoConnectionString)
  .then(() => {
    console.log("connected to database");

    // Start the server and listen on port 5000
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
