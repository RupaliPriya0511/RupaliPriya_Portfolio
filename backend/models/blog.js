const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  date: Date,
  content: String,
  imageUrl: String  // Will store file path
});

module.exports = mongoose.model('Blog', blogSchema);
