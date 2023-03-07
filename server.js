const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to database
mongoose.connect('mongodb+srv://jamesbrowne:tGkr76p5m8cgfGUG@cluster0.90fwvtk.mongodb.net/MK?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to database'))
.catch(err => console.log(err));

// Middleware
app.use(express.json());

// Routes
app.use('/', require('./routes/api'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
