var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    title: { type: String, required: true },
    // IMAGE
    price: { type: Number, required: true },
    location: String,
    list: { type: String, required: true },
});


// userSchema.pre('save', function (next) {
//     var currentDate = new Date();

//     this.updated_at = currentDate;

//     if (!this.created_at) {
//         this.created_at = currentDate;
//     }

//     next();
// })

module.exports = mongoose.model('WishListItem', itemSchema);