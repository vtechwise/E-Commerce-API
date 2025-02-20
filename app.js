require("dotenv").config();
require("express-async-errors");

const express = require("express");

const connectDB = require("./db/connect");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const app = express();

// middelware
app.use(express.json());
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server started at ${port}`);
    });
  } catch (error) {
      console.log(error);
      
  }
};

start();
