const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = process.env.PORT || 3000;
const uri = "mongodb+srv://jamesbrowne:tGkr76p5m8cgfGUG@cluster0.90fwvtk.mongodb.net/MK?retryWrites=true&w=majority";

// Serve the static files in the public folder
app.use(express.static('public'));

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }

  const db = client.db('MK');

  // Define your routes here
  app.get('/api/stats', (req, res) => {
    db.collection('Stats').find().toArray((err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching players.');
        return;
      }

      res.send(result);
    });
  });

  // Start the server
  app.listen(port, () => {
    console.log(`App running on port ${port}.`);
  });
});
