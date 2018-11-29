const express = require("express");
const app = express();

// Setup morgan monitoring
const morgan = require("morgan");
app.use(morgan("dev"));

// Setup body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cross-Origin Resource Sharing
app.use((req, res, next) => {
  res.header("Access-Controll-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Metods", "GET, PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// MongoDB connection
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost/academind-shop",
  { useNewUrlParser: true },
  () => {
    console.log("MongoDB connected.");
  }
);

// Routing
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// Error handling routes
app.use((req, res, next) => {
  const error = new Error("Not found.");
  error.status = 400;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message } });
});

module.exports = app;
