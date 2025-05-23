
const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    title: String,
    date: String,
    org: String,
    description: String,
    link: String
});

module.exports = mongoose.model("Certificate", certificateSchema);
