const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const auth = require('../middleware/auth');


//Add new subscription to a challenge to user
router.post('/', auth, async (req, res) => {

    let user = await User.findById(req.user._id);
    if (!user) return res.status(400).send('User not found');


    //Checks if already subscibed to Challenge
    let isAlredy = false;
    user.challenges.forEach((el) => {
        if (el.challenge == req.body.id) {
            isAlredy = true;
            return res.status(400).send('Yor already subscribed to this Challenge');
        }
    });
    if (isAlredy) return;

    //if not subscribed
    //Adds new Challenge Object to end of List adds reference
    //postion and fullfilled take default values
    user.challenges.push({ challenge: req.body.id });
    user = await user.save();
    res.send(user);
});



//Deletes challenge references by ID from User
router.put('/:id', auth, async (req, res) => {
    let user = await User.findById(req.user._id);
    if (!user) return res.status(400).send('User not found');

    for (let i = 0; i < user.challenges.length; ++i) {
        if (user.challenges[i].challenge == req.params.id) {
            user.challenges.splice(i, 1);
            break;
        }
    }
    user = await user.save();
    res.send(user);
});

module.exports = router;