const express = require('express');
const router = express.Router();
const postModel = require('../models/post');


//  GET all posts
router.get('/', async (req, res) => {
    try {
        const posts = await postModel.find({}).populate('author');

        return res.json(posts);
    } catch (error) {
        res.status(400).json("err");

    }
})

//  GET post
router.get('/:id', async (req, res) => {
    id = req.params.id;

    try {
        const post = await postModel.findById(id).populate({ path: 'author' });

        return res.json(post);
    } catch (error) {
        res.status(400).json("err");

    }

})

//  POST new post
router.post('/', async (req, res) => {
    if (req.body == {}) return res.status(402).json("fields are required");
    try {
        const post = req.body
        const savedPost = await postModel.create(post);

        return res.json(savedPost);

    } catch (error) {

        res.status(500).json("err");
    }
})

//  PUT post
router.put('/:id', async (req, res) => {
    if (req.body == {}) return res.status(402).json("fields are required");

    try {
        id = req.params.id;
        const post = req.body;
        const updatedPost = await postModel.updateOne({ _id: id }, post);
        return res.json(updatedPost);

    } catch (error) {

        res.status(500).json("err");
    }

})

// DELETE post
router.delete('/:id', (req, res) => {
    id = req.params.id;

    postModel.deleteOne({ _id: id }).then(() => {
        return res.json("Deleted");

    }).catch(() => {
        res.status(500).json("err");

    })
})



module.exports = router;