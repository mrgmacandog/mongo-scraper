// Dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
// const db = require("./models");

const PORT = (process.env.PORT || 3000);

// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// TODO: Connect to the Mongo DB

// TODO: Routes
app.get("/", (req, res) => res.send("Success"));

// Start the server
app.listen(PORT, function() {
  console.log(`App running on http://localhost:${PORT}`);
});
