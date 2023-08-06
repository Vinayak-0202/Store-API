require("dotenv").config();

//async error

const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const products = require("./routes/products");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//middleware

//routes

app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><a href='/api/v1/products'>Products</a>");
});

app.use("/api/v1/products", products);

const port = process.env.PORT || 3000;
const start = () => {
  //connectDB
  connectDB(process.env.MONGO_URI);
  app.listen(port, console.log(`Serever is Listening on port ${port}...`));
};

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

start();
