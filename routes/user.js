const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const auth = require('../middleware/auth');


//Do I really need this Endpoint or can I destroy it
//If neede it shoul probably be admin
router.get('/', async (req, res) => {
    const users = await User.find().sort({ name: 1 }).select('name', 'challenges');
    res.send(_.pick(users));
});



module.exports = router;