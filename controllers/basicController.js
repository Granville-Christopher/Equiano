
// controllers/basicController.js
const Testimonial = require('../models/Testimonial'); // Adjust the path as needed
const PdfFile = require('../models/pdf')

  

// Function to handle testimonial submission
const submitTestimonial = async (req, res) => {
  try {
    const { name, email, testimonial } = req.body;

    const newTestimonial = new Testimonial({
      name,
      email,
      testimonial,
    });

    const savedTestimonial = await newTestimonial.save();

    // Directly sending the message to the view
    if (savedTestimonial) {
      return res.render('user/index', {
        testimonials: await Testimonial.find().sort({ createdAt: -1 }), 
        message: "Review submitted successfully",
        title: 'Welcome to the Index Page',
      });
    } else {
      return res.render('user/index', {
        testimonials: await Testimonial.find().sort({ createdAt: -1 }),
        message: "Error sending review",
        title: 'Welcome to the Index Page',
      });
    }
  } catch (error) {
    console.error(error);
    return res.render('user/index', {
      testimonials: await Testimonial.find().sort({ createdAt: -1 }),
      message: "Server error", // Send server error message
      title: 'Welcome to the Index Page',
    });
  }
};

const download = async (req, res) => {
  const pdf = await PdfFile.findOne().sort({ createdAt: -1 });

  res.status(200).render('user/download', {pdf, title: "Download" })
}

module.exports = {
      submitTestimonial,
      download,
    };
