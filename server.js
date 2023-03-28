const express = require('express');
const morgan = require('morgan');
const app = express();


// Use Morgan middleware to log requests
app.use(morgan('dev'));
app.use(express.static('public'));

const statsRouter = require('./routes/stats');
app.use(express.static('views'));


app.use('/stats', (req, res) => {
  res.sendFile(__dirname + '/views/stats.html');
});

app.use('/api/stats', statsRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
