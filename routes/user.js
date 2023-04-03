const express = require('express');
const router = express.Router();
const userModel = require('../models/user');


//  GET all users
router.get('/', async (req, res) => {

    try {
        const users = await userModel.find({});
        res.json(users);
    } catch (error) {
        res.status(400).json("err");
    }
})

//  GET user
router.get('/:id', async (req, res) => {
    try {

        id = req.params.id;
        const user = await userModel.findById(id);
        res.json(user);
    } catch (error) {

        res.status(400).json("err");
    }
})

//  POST user
router.post('/', async (req, res) => {
    if (req.body == {}) return res.status(402).json("fields are required");
    try {
        const user = req.body
        const savedUSer = await userModel.create(user);

        return res.json(savedUser);
    } catch (error) {

        res.status(500).json("err");
    }
})

//  PUT User
router.put('/:id', async (req, res) => {
    id = req.params.id;
    if (req.body == {}) return res.status(402).json("fields are required");

    try {
        const user = req.body;
        const updatedUser = await userModel.updateOne({ _id: id }, user);
        return res.json(updatedUser);
    } catch (error) {

        return res.status(500).json("err");
    }

})
// DELETE user
router.delete('/:id', (req, res) => {
    id = req.params.id;
    try {
        userModel.deleteOne({ _id: id }).then(() => {

            return res.json("Deleted");
        })
    } catch (error) {
        return res.status(500).json("err");

    }

})



module.exports = router;