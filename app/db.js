const mongoose = require('mongoose');

mongoose.connect('mongodb://' + process.env.MONGO_HOST + '/' + process.env.MONGO_DATABASE)

console.log('mongodb://' + process.env.MONGO_HOST + '/' + process.env.MONGO_DATABASE);

const db = mongoose.connection;
db.on('error', function (err) {
    console.log(err);
})

db.once('open', function () {
    console.log('DATABASE CONNECTION');
});

mongoose.Promise = global.Promise;

module.exports = db;