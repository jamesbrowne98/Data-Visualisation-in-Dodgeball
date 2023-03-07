const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jamesbrowne:tGkr76p5m8cgfGUG@cluster0.90fwvtk.mongodb.net/MK?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});