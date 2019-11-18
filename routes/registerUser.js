const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

//Find ID of user, by looking in his stored webtoken
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password'); //req.user.id comes from middleware and so from webtoken
    res.send(user);
});

//Generating new user
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = new User(_.pick(req.body, ['name', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();

    const token = user.generateAuthToken();
    //Generates auth token with information about admin
    res.header('x-auth-token', token);
    //returns further information as Json
    res.send(_.pick(user, ['_id', 'name']));
});

module.exports = router;