const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');

//Logging in
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Find User
    let user = await User.findOne({ name: req.body.name });
    if (!user) return res.status(400).send("Invalid Email or Password");

    //Validate User password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid Email or Password");

    //Return JsonWebToken, generate Auth Token is function of user
    const token = user.generateAuthToken();
    res.send(token);
});

function validate(req) {
    const schema = {
        name: Joi.string(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;