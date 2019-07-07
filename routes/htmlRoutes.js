const db = require("../models");

// Export HTML routes
module.exports = app => {
    app.get("/", (req, res) => res.send("Success"));

    app.get("/test", (req, res) => {
        db.Article.find({})
            .then(dbArticle => {
                console.log(dbArticle);
                res.render("index", { articles: dbArticle })
            })
            .catch(err => res.json(err));
    });
}