const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction'); // Assuming you're using this model to check payments

// Secure download route
router.get('/', async (req, res) => {
  try {
    // Check if the user has made a successful payment
    const paymentSuccessful = await Transaction.findOne({ email: req.session.email, status: 'success' });

    // If no successful payment, redirect to the index page
    if (!paymentSuccessful) {
      return res.redirect('/');  // Redirect to the homepage or index page if no payment found
    }

    // If payment is successful, render the download page
    return res.status(200).redirect('/download');  // Render the download page if payment is successful
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error checking payment');
  }
});

module.exports = router;
