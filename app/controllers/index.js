const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Amazon = require('amazon-product-api');

const WishList = mongoose.model('WishList');

module.exports = app => {
    app.use('/api', router);
}
// Get all the lists
router.get('/list', (req, res, next) => {
    WishList.find({ username: process.env.USERNAME }, (err, lists) => {
        if (err) return res.send(err);
        res.json(lists);
    });
});
// Create a new List
router.post('/list', (req, res, next) => {
    const newList = new WishList({
        name: req.body.name,
        username: process.env.USERNAME
    });
    newList.save((err, list) => {
        if (err) return res.send(err);
        res.json(list)
        console.log('SAVED', list);
    });
});
// Add Item to list
router.post('/add-item', (req, res, body) => {
    WishList.findOne({ name: req.body.list }, (err, list) => {
        if (err) return res.send(err);
        // Add the item to the list if it exists
        if (list) {
            list.items = [...list.items, req.body];
            list.save((err, list) => {
                if (err) return res.send(err);
                res.json(list);
            });
        // Create the list and add the item to the list if it doesn't exist
        } else {
            const newList = new WishList({
                name: req.body.list,
                username: process.env.USERNAME
            });
            newList.save((err, thatList) => {
                if (err) return res.send(err);
                thatList.items = [...thatList.items, req.body]
                thatList.save((err, updatedList) => {
                    if (err) return res.send(err);                    
                    res.json(updatedList);
                });
            });
        }
    });
});
// Get product suggestions based on items in the database
router.get('/suggested', (req, res, next) => {
    const client = Amazon.createClient({
        awsId: process.env.AWS_KEY,
        awsSecret: process.env.AWS_SECRET,
    });
    // GENERATE THE KEYWORDS
    let allKeywords = []
    WishList.find({ username: process.env.USERNAME }, (err, lists) => {
        if (err) return res.send(err);
        lists.forEach(e => {
            e.items.forEach(i => {
                allKeywords = [...allKeywords, i.title.split(' ')[0]];
            });
        });
        // SEARCH FOR PRODUCTS WITH THE KEYWORDS
        client.itemSearch({
            keywords: allKeywords,
            responseGroup: 'ItemAttributes,Offers,Images'
        }, (err, results, response) => {
            if (err) return res.send(err);
            
                let products = [];
                results.forEach(e => {
                    if (e.Offers[0].TotalOffers[0] > 0) {
                        products = [...products, {
                            title: e.ItemAttributes[0].Title[0],
                            price: e.Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice,
                            image: e.MediumImage[0].URL[0]
                        }];
                    }
                });
                res.send(products);
            });
    });
});