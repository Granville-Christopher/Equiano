const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')
const upload  = require('../middlewares/upload');
const uploads  = require('../middlewares/upload');
const PdfFile = require('../models/pdf')
const AboutBook = require('../models/about')
const AboutAuthor  = require('../models/aboutauthor')
const RelatedBook  = require('../models/relatedbook')


// Route for the admin dashboard or index page
router.get('/', async (req, res) => {
  try {
    if (!req.session.adminId) {
      req.session.message = "Please log in to access the admin dashboard.";
      req.session.message = null
      return res.redirect('/admin/login');
    }
    const pdfs = await PdfFile.find().sort({ createdAt: -1 });
    const about = await AboutBook.findOne().sort({ createdAt: -1 });
    const author = await AboutAuthor.findOne().sort({ createdAt: -1 });
    const related = await RelatedBook.find().sort({ createdAt: -1 });
  
    return res.render('admin/admin', { pdfs, about, author, related, title: 'Welcome to the Admin Dashboard', message: req.session.message }); // Pass the testimonials to the view
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error fetching pdfs');
  }
});



// Route for admin registration
router.get('/register', (req, res) => {
  return res.render('admin/adminregister', { title: 'Admin Registration' , message: req.session.message });
});
router.post('/register', adminController.registerAdmin);

// Route for admin login
router.get('/login', (req, res) => {
  return res.render('admin/adminlogin', { title: 'Admin Login' , message: req.session.message });
});
router.post('/login', adminController.loginAdmin);


// Route to handle book PDF upload
router.post('/upload-book', upload.single("book-pdf"), adminController.uploadBookPDF); 
router.post('/delete-file/:id', adminController.deletePdf);
// router.post('/upload-book', uploadBookPDF);

// about book
router.post('/upload-content', adminController.uploadAboutBook);
router.post('/delete-about/:id', adminController.deleteAboutBook);

router.post('/upload-author', adminController.uploadAboutAuthor);
router.post('/delete-author/:id', adminController.deleteAboutAuthor);

// related book
router.post('/upload-related-book', uploads.single("image"), adminController.uploadRelatedBook);
router.post('/delete-related/:id', adminController.deleteRelatedBook);


module.exports = router;
