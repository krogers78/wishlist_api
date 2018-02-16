var mongoose = require('mongoose');

var listSchema = mongoose.Schema({
    name: { type: String, required: true },
    items: { type: Array },
    username: { type: String, required: true }
});

module.exports = mongoose.model('WishList', listSchema);