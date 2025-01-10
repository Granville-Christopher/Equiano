const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  testimonial: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;