const mongoose = require('mongoose');
const WishList = require('../models/wishlist.js');


mongoose.connect('mongodb://kloe:qwaszx@ds239638.mlab.com:39638/wishlist');
// mongodb://localhost/wishlist
// mongodb://bradrules:rules@ds239638.mlab.com:39638/wishlist

const products = [
    new WishList({
        name: "Birthday",
        username: "kloe",
        items: [
            {
                list: "Birthday",
                location: "Amazon",
                price: 8.77,
                title: "Funko Pop TV Bob Ross with Raccoon (Styles May Vary) Collectible Figure"
            },
            {
                list: "Birthday",
                location: "Amazon",
                price: 9.9,
                title: "Funko POP Movies: Harry Potter Action Figure - Draco Malfoy"
            },
            {
                list: "Birthday",
                location: "Amazon",
                price: 8.95,
                title: "Funko Pop TV Bob Ross in Overalls Collectible Figure"
            },
            {
                list: "Birthday",
                location: "Amazon",
                price: 299,
                title: "Nintendo Switch - Neon Blue and Red Joy-Con"
            }
        ]
    })
];

let done = 0

products.forEach(e => {
    e.save((err, result) => {
        done++;
        if (done === products.length) {
            exit();
        }
    });
});

function exit() {
    mongoose.disconnect();
}