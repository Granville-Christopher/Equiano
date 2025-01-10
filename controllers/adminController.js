const Admin = require('../models/admin'); // Import the Admin model
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const PdfFile = require('../models/pdf')
const { passwordEncrypt } = require("../middlewares/details"); // Import the uploadPDF function
const AboutBook = require('../models/about');
const RelatedBook = require('../models/relatedbook')
const AboutAuthor = require('../models/aboutauthor')


// const login = require('../models/admin');

// Admin registration function
const registerAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.render('admin/adminregister', { title: 'Admin Registration', message: 'Passwords do not match' });
    }

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.render('admin/adminregister', { title: 'Admin Registration', message: 'Admin already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new admin
    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Save the new admin to the database
    await newAdmin.save();

    // Redirect to login page after successful registration
    res.redirect('/admin/login');
  } catch (error) {
    console.error(error);
    res.render('admin/adminregister', { title: 'Admin Registration', message: 'An error occurred during registration' });
  }
};


const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      req.session.message = "Invalid email or password.";
      req.session.message = null
      return res.status(401).redirect('/admin/login');
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      req.session.message = "Invalid email or password.";
      req.session.message = null
      return res.status(401).redirect('/admin/login');
    }

    // Set session
    req.session.adminId = admin._id;
    console.log("Admin login successful:", req.session.adminId);

    // Redirect to admin page
    console.log("Redirecting to /admin...");
    return res.status(200).redirect('/admin');
  } catch (error) {
    console.error("Error during loginAdmin:", error);
    req.session.message = "An error occurred. Please try again later.";
    delete req.session.message
    return res.status(500).redirect('/admin/login');
  }
};

const uploadBookPDF = async (req, res) => {
  try {
    if (!req.file) {
      req.session.message = "No file uploaded. Please select a file.";
      return req.session.save((err) => {
        if (err) console.error("Session save error:", err);
        res.status(400).redirect('/admin');
      });
    }

    const filename = req.file.filename;
    const pdf = new PdfFile({ file: filename });
    await pdf.save();
    req.session.message = "PDF uploaded successfully!";
    req.session.message = null
    return req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).send("Error saving session");
      }
      res.redirect('/admin');
    });
  } catch (error) {
    console.error("Error during PDF upload:", error);
    req.session.message = "An unexpected error occurred.";
    delete req.session.message
    return req.session.save((err) => {
      if (err) console.error("Session save error:", err);
      res.status(500).redirect('/admin');
    });
  }
};

// delete pdf

const deletePdf = async (req, res) => {
  try {
    const pdfId = req.params.id;

    // Find the PDF in the database
    const pdf = await PdfFile.findById(pdfId);

    if (!pdf) {
      req.session.message = "File not found.";
      delete req.session.message
      return res.status(404).redirect('/admin');
    }

    // Remove the file from the server
    const filePath = path.join(__dirname, '..', 'public', 'uploads', 'uploadedimages', pdf.file);
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting file from server:', err);
    });

    // Remove the entry from the database
    await PdfFile.findByIdAndDelete(pdfId);

    req.session.message = "File deleted successfully.";
    delete req.session.message
    return res.status(200).redirect('/admin');
  } catch (error) {
    console.error("Error deleting file:", error);
    req.session.message = "An error occurred. Please try again later.";
    delete req.session.message
    return res.status(500).redirect('/admin');
  }
};

// upload about book

// Upload About Book
const uploadAboutBook = async (req, res) => {
  try {
    const { about } = req.body;

    const newAbout = new AboutBook({
      about,
    });

    const savedAbout = await newAbout.save();

    // Directly sending the message to the view
    if (savedAbout) {
      console.log('yes')
      return res.redirect('/admin');
    } else {
      return res.redirect('/admin');
    }
  } catch (error) {
    console.error(error);
    return res.redirect('/admin');
  }
};

// delete about
const deleteAboutBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the AboutBook entry
    const deleted = await AboutBook.findByIdAndDelete(id);

    if (deleted) {
      req.session.message = "About the Book deleted successfully.";
      delete req.session.message
    } else {
      req.session.message = "Error deleting About the Book.";
      delete req.session.message
    }

    return res.redirect('/admin');
  } catch (error) {
    console.error('Error deleting AboutBook:', error);
    req.session.message = "Server error. Could not delete About the Book.";
    delete req.session.message
    return res.redirect('/admin');
  }
};

const uploadAboutAuthor = async (req, res) => {
  try {
    const { author } = req.body;

    const newAuthor = new AboutAuthor({
      author,
    });

    const savedAuthor = await newAuthor.save();

    // Directly sending the message to the view
    if (savedAuthor) {
      console.log('yes')

      return res.redirect('/admin');      
    } else {
      return res.redirect('/admin');
    }
  } catch (error) {
    console.error(error);
    return res.redirect('/admin');
  }
};

// delete about author
const deleteAboutAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the AboutBook entry
    const deleted = await AboutAuthor.findByIdAndDelete(id);

    if (deleted) {
      req.session.message = "About the author deleted successfully.";
      delete req.session.message
    } else {
      req.session.message = "Error deleting About the author.";
      delete req.session.message
    }

    return res.redirect('/admin');
  } catch (error) {
    console.error('Error deleting AboutAuthor:', error);
    req.session.message = "Server error. Could not delete About the author.";
    delete req.session.message
    return res.redirect('/admin');
  }
}


// upload related books

const uploadRelatedBook = async (req, res) => {
  try {
    if (!req.file) {
      req.session.message = "Image File is required";
      return res.status(400).redirect("/admin");
    }

    // Access other form fields
    const { link, title} =  req.body;
    const file = req.file.filename;

    let info = {
      image: file,
      title,
      link,
    };

  
    const newRelatedBook = await new RelatedBook(info).save();
    if (newRelatedBook !== null) {
      req.session.message = "related book  uploaded";
      delete req.session.message;
      res.status(200).redirect("/admin");
    } else {
      req.session.message = "upload failed";
      delete req.session.message;
      res.redirect("/admin");
    }
  } catch (error) {
    console.error(error);
    req.session.flag = "upload failed due to server error";
    res.redirect("/admin");
  }
};

// delete related book
const deleteRelatedBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the AboutBook entry
    const deleted = await RelatedBook.findByIdAndDelete(id);

    if (deleted) {
      req.session.message = " book deleted successfully.";
      delete req.session.message
    } else {
      req.session.message = "Error deleting book.";
      delete req.session.message
    }

    return res.redirect('/admin');
  } catch (error) {
    console.error('Error deleting Book:', error);
    req.session.message = "Server error. Could not delete book.";
    delete req.session.message
    return res.redirect('/admin');
  }
}
  
module.exports = {
  registerAdmin,
  loginAdmin,
  uploadBookPDF,
  deletePdf,
  uploadAboutBook,
  deleteAboutBook,
  uploadAboutAuthor,
  deleteAboutAuthor,
  uploadRelatedBook,
  deleteRelatedBook,
};
