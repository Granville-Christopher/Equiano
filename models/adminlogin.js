const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminLoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Encrypt password before saving
adminLoginSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare entered password with hashed password
adminLoginSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
  

module.exports = mongoose.model('AdminLogin', adminLoginSchema);
