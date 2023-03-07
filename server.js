const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');

const app = express();

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes for API endpoints
app.use('/api', apiRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://jamesbrowne:tGkr76p5m8cgfGUG@cluster0.90fwvtk.mongodb.net/MK?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.error(err));

// Start server
const port = process
