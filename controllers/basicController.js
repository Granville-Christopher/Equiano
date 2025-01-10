
// controllers/basicController.js
const Testimonial = require('../models/testimonial'); // Adjust the path as needed
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
      return res.status(200).redirect('/');
    } else {
      req.session.message = "errror sending review"
      return res.status(401).redirect('/');
    }
  } catch (error) {
    console.error(error);
    return res.status(200).redirect('/', {
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
