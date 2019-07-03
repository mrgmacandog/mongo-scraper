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

// Test route
app.get("/", (req, res) => res.send("Success"));

// Scrape route
app.get("/scrape", (req, res) => {
    // Get website
    axios.get("https://www.entrepreneur.com/topic/coding/1").then(response => {
        // Save HTML into $
        const $ = cheerio.load(response.data);

        // Article 1 Title
        $("#latest .feature h3").each((i, element) => {
            console.log($(element).find("a").text().trim());
        });

        // TODO: Differentiate between title and author
        // Articles 2 - 4 Title
        $("#latest .col").each((i, element) => {
            console.log($(element).find("a").text().trim());
        });

        res.send("Scraping...");
    })
});

// Start the server
app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
