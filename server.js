// Dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

// TODO: See if this is necessary
// Require all models
const db = require("./models");

// Set the port
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

// Set template engine to handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/entrepreneur";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

/*
// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/entrepreneur", { useNewUrlParser: true });
*/

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Start the server
app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
