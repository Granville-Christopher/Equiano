const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const basicRoute = require('./routes/basicRoute');
const adminRoute = require('./routes/adminRoute');
const downloadRoute = require('./routes/downloadRoute');
// const testimonialRoute = require('./routes/testimonialRoute'); // Import the testimonial route

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to database
const dbURI = process.env.DBURI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to DB');
    // Listen for requests only after database connection is established
    const PORT = process.env.PORT;
    app.listen(PORT, () => console.log(`Running on PORT ${PORT}`));
  })
  
  .catch((err) => console.error(err));

// Register view engine
app.set("view engine", "ejs");

// Middleware for static files
app.use(express.static('public'));

// Setting for express session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Middleware to process form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', basicRoute);
app.use('/download', downloadRoute);
app.use('/admin', adminRoute);
// app.use('/', testimonialRoute); // Ensure testimonial route is placed before the 404 route

// 404 route (keep this as the last middleware)
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
