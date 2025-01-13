const mongoose = require('mongoose');

// Define the Transaction Schema
const transactionSchema = new mongoose.Schema({
  reference: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'success' },
  createdAt: { type: Date, default: Date.now },
});

// Create the Transaction model
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
