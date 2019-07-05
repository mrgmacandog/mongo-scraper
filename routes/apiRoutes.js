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

            let articles = {};
            
            $(".block").each((i, element) => {
                // Article titles
                // console.log($(element).find("h3 a").text().trim());

                // Article summaries
                // console.log($(element).find(".deck").text().trim());

                // Article authors
                // console.log($(element).find(".name").text().trim());

                // Article read times
                // console.log($(element).find(".readtime").text().trim());

                // Article link
                // console.log(`https://www.entrepreneur.com${$(element).find("h3 a").attr("href")}`);
                
                // Article image
                // console.log($(element).parent().find("img").attr("src").trim());
            });

            // TODO: Differentiate between title and author
            // Articles 2 - 4 Title
            $("#latest .col").each((i, element) => {
                // console.log($(element).find("a").text().trim());
            });

            // TODO: Test and put into .each function
            //       result should be a proper object
            // db.Article.create(result)
            //     .then(dbArticle => console.log(dbArticle))
            //     .catch(err => console.log(err));

            res.send("Scrape Complete");
        })
        // res.send("In GET /scrape")
    });

    // Get all articles from the database
    app.get("/articles", (req, res) => {
        db.Article.find({})
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.json(err));
    });

    // Get a specific article from the database
    app.get("/articles/:id", (req, res) => {
        db.Article.findOne({ _id: req.params.id })
            .populate("note")
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.json(err));
    })
};