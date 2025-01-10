const mongoose = require('mongoose');

const AboutBookSchema = new mongoose.Schema({
    about: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const AboutBook = mongoose.model('AboutBook', AboutBookSchema);

module.exports = AboutBook;