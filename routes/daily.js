const { User, validate } = require('../models/user');
const { Challenge } = require('../models/challenge');
const { Activity } = require('../models/activity');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const auth = require('../middleware/auth');


//Add new subscription to a challenge to user
//Wird eigentlcih von route subsciption getragen
router.post('/', auth, async (req, res) => {

    let user = await User.findById(req.user._id);
    if (!user) return res.status(400).send('User not found');
    user.challenges.push({ challenge: req.body.id, position: 0 });
    user = await user.save();
    res.send(user);
});


//Get all subscribed challenges from User (just the ID)
router.get('/', auth, async (req, res) => {
    let subscription = await User.findById(req.user._id).
        select({ challenges: 1 });
    subscription = _.pick(subscription, ['challenges']);

    let response = [];
    console.log('Lenght', subscription.challenges);
    //Iterate over all subscribed challenges for one User
    for (let i = 0; i < subscription.challenges.length; ++i) {
        //Get the Challenge object for each
        let chal = await Challenge.findById(subscription.challenges[i].challenge);
        //let length = chal.activities.length; //How many activities are in Current challenge
        //console.log('Challenge', chal);
        //Get the Activity Object of the day
        let activity = await Activity.findById(chal.activities[subscription.challenges[i].position]);
        console.log('activity', activity);
        response[i] = {
            challenge: subscription.challenges[i].challenge,
            activity: activity,
            position: subscription.challenges[i].position,
            fullfilled: subscription.challenges[i].fullfilled,
            color: chal.color,
            image: chal.image,
            length: chal.activities.length
        }
    }
    res.send(response);
});


//Update Challenge referernced with id
router.put('/:id', auth, async (req, res) => {
    //Load the referenced User
    let challenges = await User.findById(req.user._id)
        .select({ challenges: 1 });

    //query the challenges for the one with the challenge ID
    for (let i = 0; i < challenges.challenges.length; ++i) {
        if (challenges.challenges[i].challenge == req.params.id) {
            ++challenges.challenges[i].position;
            challenges.challenges[i].fullfilled = Date.now();
            break;
        }
    }
    chllenges = challenges.save();
    res.send(challenges);
});

module.exports = router;