// Export HTML routes
module.exports = app => {
    app.get("/", (req, res) => res.send("Success"));
};