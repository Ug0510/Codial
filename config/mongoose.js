const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codial_development');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error connecting database'));

db.once('open', function(){
    console.log("Connected to Database:: MONGODB");
})

module.exports = db;