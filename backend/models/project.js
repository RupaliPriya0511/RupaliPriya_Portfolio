const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: String,
    date: String,
    description: String,
    link: String,
    source: String  
});

module.exports = mongoose.model('Project', projectSchema);
