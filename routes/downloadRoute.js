const express = require('express');
const router = express.Router();

// Example route for the index page
router.get('/', (req, res) => {
  res.render('/download', { title: 'Welcome to the Index Page' }); // Pass variables if needed
});

module.exports = router;
