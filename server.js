const express = require('express');
const statsRouter = require('./routes/stats');

const app = express();

app.use('/api/stats', statsRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
