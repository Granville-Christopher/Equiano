const express = require('express');
const router = express.Router();
const basicController = require('../controllers/basicController');
const Testimonial = require('../models/testimonial'); 
const RelatedBooks = require('../models/relatedbook'); 
const AboutAuthor = require('../models/aboutauthor');
const AboutBook = require('../models/about');

// Example route for the index page
router.get('', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    const related = await RelatedBooks.find().sort({ createdAt: -1 });
    const author = await AboutAuthor.findOne().sort({ createdAt: -1 });
    const about = await AboutBook.findOne().sort({ createdAt: -1 });
    // Check if testimonials are being fetched properly
    // This will print the fetched testimonials
    res.render('user/index', { testimonials, related, about, author, title: 'Welcome to the Index Page' , message: req.session.message}); // Pass the testimonials to the view
  } catch (error) {
    console.error(error);
    res.status(500).send('server error');
  }
});

router.post('/save-customer', basicController.saveCustomer);
router.post('/save-transaction', basicController.saveTransaction);
// router.get('/download', basicController.download)
router.post('/submit-testimonial', basicController.submitTestimonial);

module.exports = router;
    