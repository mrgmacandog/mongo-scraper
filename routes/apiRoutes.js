// Dependencies
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

// Export API routes
module.exports = app => {
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

            // TODO: Test and put into .each function
            //       result should be a proper object
            db.Article.create(result)
                .then(dbArticle => console.log(dbArticle))
                .catch(err => console.log(err));

            res.send("Scrape Complete");
        })
        // res.send("In GET /scrape")
    });
};