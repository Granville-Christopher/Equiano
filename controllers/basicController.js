
// controllers/basicController.js
const Testimonial = require('../models/testimonial'); // Adjust the path as needed
const PdfFile = require('../models/pdf')
const Customer = require('../models/customer');
const Transaction = require('../models/transaction')

  

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


const saveCustomer = async (req, res) => {
  const { name, email, amount } = req.body;

  try {
    // Generate a unique transaction reference
    const transactionRef = 'BOOK_' + Math.floor(Math.random() * 1000000000 + 1);

    // Create and save a new customer record
    const newCustomer = new Customer({
      name,
      email,
      amount,
      transactionRef,
    });

    await newCustomer.save();
    console.log("Customer saved:", newCustomer);
    // Respond with success and transaction reference
    res.status(200).json({ success: true, transactionRef });
  } catch (err) {
    console.error('Error saving customer:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


const saveTransaction = async (req, res) => {
  const { reference, email, amount } = req.body;

  try {
    // Create a new transaction and save it to the database
    const transaction = new Transaction({
      reference,
      email,
      amount,
      status: 'success', // You can adjust the status based on your needs
    });

    // Save to the database
    await transaction.save();

    console.log('Transaction saved:', transaction);

    // Respond with a success message
    res.status(200).json({ success: true, message: 'Transaction saved successfully!' });
  } catch (error) {
    console.error('Error saving transaction:', error);
    res.status(500).json({ success: false, message: 'Error saving transaction.' });
  }
};





const download = async (req, res) => {
  const pdf = await PdfFile.findOne().sort({ createdAt: -1 });

  res.status(200).render('user/download', {pdf, title: "Download" })
}

module.exports = {
      submitTestimonial,
      download,
      saveCustomer,
      saveTransaction,
    };
