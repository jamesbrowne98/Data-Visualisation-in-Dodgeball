const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/api');

const app = express();

// Use Morgan middleware to log requests
app.use(morgan('dev'));

// Enable CORS
app.use(cors());

// Serve static files from the views directory
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb+srv://jamesbrowne:tGkr76p5m8cgfGUG@cluster0.90fwvtk.mongodb.net/MK', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Handle MongoDB connection errors
mongoose.connection.on('error', error => {
  console.error('MongoDB connection error:', error);
});

// Mount the stats router at the /api/stats route
app.use('/api/stats', router);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


