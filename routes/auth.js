const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.post("/register", async (req, res) => {
    try {
        const { name, email, password,password2, age } = req.body;

        if (!(email && password && password2 && name && age)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await userModel.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }


        if (password != password2) {
            return res.status(409).send('Passwords do not match');
            
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name,
            age,
            email: email.toLowerCase(), 
            password: encryptedPassword,
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        
        user.token = token;
        user.save();
        res.status(201).json(user);

    } catch (err) {
        console.log(err);
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const user = await userModel.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {

            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            user.token = token;
            user.save();

            return res.status(200).json(user);
        }
        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }

});

module.exports=router;