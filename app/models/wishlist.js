var mongoose = require('mongoose');

var listSchema = mongoose.Schema({
    name: { type: String, required: true },
    items: { type: Array },
});

module.exports = mongoose.model('WishList', listSchema);