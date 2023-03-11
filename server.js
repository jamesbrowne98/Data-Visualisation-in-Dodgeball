const express = require('express');
const morgan = require('morgan');
const app = express();

// Use Morgan middleware to log requests
app.use(morgan('dev'));

// Serve static files from the views directory
app.use(express.static('views'));

// Serve the stats.html file for the /stats route
app.get('/stats', (req, res) => {
  res.sendFile(__dirname + '/views/stats.html');
});

// Mount the stats router at the /api/stats route
const statsRouter = require('./routes/stats');
app.use('/api/stats', statsRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
