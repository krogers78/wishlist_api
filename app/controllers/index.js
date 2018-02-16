const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const WishList = mongoose.model('WishList');

module.exports = app => {
    app.use('/api', router);
}
// Get all the lists
router.get('/list', (req, res, next) => {
    WishList.find({ username: process.env.USERNAME }, (err, lists) => {
        if (err) return res.send(err);
        res.send(lists);
    });
});
// Create a new List
router.post('/list', (req, res, next) => {
    const newList = new WishList(req.body);
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

