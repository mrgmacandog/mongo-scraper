const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
const ArticleSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },
  // `summary` is required and of type String
  summary: {
    type: String,
    required: true
  },
  // `author` is required and of type String
  author: {
    type: String,
    required: true
  },
  // `readTime` is required and of type String
  readTime: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true
  },
  // `image` is required and of type String
  image: {
    type: String,
    required: true
  },
  
  // `note` is an object that stores a Note id
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
