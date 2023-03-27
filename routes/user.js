const express = require('express');
const router = express.Router();
const userModel = require('../models/user');


//  GET all users
router.get('/', (req, res) => {
    userModel.find({}, (err, users) => {
        if (err) {
            res.status(400).json("err");
        }
        res.json(users);

    })
})

//  GET user
router.get('/:id', (req, res) => {
    id = req.params.id;
    // userModel.find({ _id: id })
    userModel.findById(id, (err, user) => {
        if (err) {
            res.status(400).json("err");
        }
        res.json(user);

    })
})

//  POST user
router.post('/', (req, res) => {
    if (req.body == {}) res.status(402).json("fields are required");
    const user = req.body 
    userModel.create(user, (err, savedUser) => {
        if (!err) {
            return res.json(savedUser);
        }
        res.status(500).json("err");
    })
})

//  PUT User
router.put('/:id', (req, res) => {
    id = req.params.id;
    if (req.body == {}) res.status(402).json("fields are required");
    const user =req.body ;

    userModel.updateOne({ _id: id }, user, (err, updatedUser) => {
        if (!err) {
            return res.json(updatedUser);
        }
        res.status(500).json("err");
    })
})
// DELETE user
router.delete('/:id', (req, res) => {
    id = req.params.id;

    userModel.deleteOne({ _id: id }, (err) => {
        if (!err) {
            return res.json("Deleted");
        }
        res.status(500).json("err");
    })
})



module.exports = router;