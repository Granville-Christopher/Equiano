const mongoose = require('mongoose');

const relatedBookSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // Validates URL format
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const RelatedBook = mongoose.model('RelatedBook', relatedBookSchema);

module.exports = RelatedBook;
