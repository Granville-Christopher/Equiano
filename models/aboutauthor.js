const mongoose = require('mongoose');

const AboutAuthorSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const AboutAuthor = mongoose.model('AboutAuthor', AboutAuthorSchema);

module.exports = AboutAuthor;