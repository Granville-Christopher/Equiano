const mongoose = require('mongoose');

const pdfFileSchema = new mongoose.Schema({
    file: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const PdfFile = mongoose.model('PdfFile', pdfFileSchema);
module.exports = PdfFile;
