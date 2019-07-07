// Dependencies
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Scrape a page from https://www.entrepreneur.com/topic/coding and store data into DB
 * @param {int} pageNumber
 */
function scrapePage(pageNumber) {
    // Get website
    axios.get(`https://www.entrepreneur.com/topic/coding/${pageNumber}`).then(response => {
        // Save HTML into $
        const $ = cheerio.load(response.data);
        
        // Iterate through each `.block` div and get article information
        $(".block").each((i, element) => {
            // Article titles
            // console.log($(element).find("h3 a").text().trim());
            let title = $(element).find("h3 a").text().trim();

            // Article summaries
            // console.log($(element).find(".deck").text().trim());
            let summary = $(element).find(".deck").text().trim();

            // Article authors
            // console.log($(element).find(".name").text().trim());
            let author = $(element).find(".name").text().trim();

            // Article read times
            // console.log($(element).find(".readtime").text().trim());
            let readTime = $(element).find(".readtime").text().trim();

            // Article link
            // console.log(`https://www.entrepreneur.com${$(element).find("h3 a").attr("href")}`);
            let link = `https://www.entrepreneur.com${$(element).find("h3 a").attr("href")}`;

            // Article image
            // console.log($(element).parent().find("img").attr("src").trim());
            let image = $(element).parent().find("img").attr("src").trim();

            // Assign new article object to articleObj
            let articleObj = {
                title: title,
                summary: summary,
                author: author,
                readTime: readTime,
                link: link,
                image: image
            };

            // Add articleObj to Articles collection in DB
            db.Article.create(articleObj)
                .then(dbArticle => console.log(dbArticle))
                .catch(err => console.log(err));
        });
    })

    // TODO: Call this function again if there is another page to scrape
}

// Export API routes
module.exports = app => {
    // Scrape route
    app.get("/scrape", (req, res) => {
        scrapePage(1);

        res.send("Scrape Complete");
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
            .populate("comment")
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.json(err));
    })

    // Add or update an Article's associated Comment
    app.post("articles/:id", (req, res) => {
        db.Comment.create(req.body)
            .then(dbComment => dbArticle.findOneAndUpdate(
                { _id: req.params.id },
                { note: dbComment.id},
                { new: true }
            ))
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.json(err));
    });
};