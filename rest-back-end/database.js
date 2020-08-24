const mongoose = require('mongoose');

const setup = async () => {

  await mongoose.connect(`mongodb://localhost/Telstra`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  var db = mongoose.connection;
  db.on('connection', () => {

    console.log("Mongodb connected");

  })
  db.on('error', console.error.bind(console, 'MongoDB connection error:'))
};


module.exports = setup;

