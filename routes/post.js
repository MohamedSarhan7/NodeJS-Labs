const express = require('express');
const router = express.Router();
const postModel = require('../models/post');


//  GET all posts
router.get('/', (req, res) => {
    postModel.find({}, (err, users) => {
        if (err) {
            res.status(400).json("err");
        }
        res.json(users);

    }).populate('author')
})

//  GET post
router.get('/:id', (req, res) => {
    id = req.params.id;
    // userModel.find({ _id: id })
    postModel.findById(id, (err, post) => {
        if (err) {
            res.status(400).json("err");
        }
        res.json(post);

    }).populate('author');
})

//  POST new post
router.post('/', (req, res) => {
    if (req.body == {}) res.status(402).json("fields are required");
    const post = req.body 
    postModel.create(post, (err, savedPost) => {
        if (!err) {
            return res.json(savedPost);
        }
        res.status(500).json("err");
    })
})

//  PUT post
router.put('/:id', (req, res) => {
    id = req.params.id;
    if (req.body == {}) res.status(402).json("fields are required");
    const post = req.body ;

    postModel.updateOne({ _id: id }, post, (err, updatedPost) => {
        if (!err) {
            return res.json(updatedPost);
        }
        res.status(500).json("err");
    })
})

// DELETE post
router.delete('/:id', (req, res) => {
    id = req.params.id;

    postModel.deleteOne({ _id: id }, (err) => {
        if (!err) {
            return res.json("Deleted");
        }
        res.status(500).json("err");
    })
})



module.exports = router;