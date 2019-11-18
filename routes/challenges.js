const { Challenge, validate } = require('../models/challenge');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');

//Get all challenges 
router.get('/', async (req, res) => {
    const challenges = await Challenge.find().sort('-difficulty');
    res.send(challenges);
}),

    //Get all activ challenges 
    router.put('/activ', async (req, res) => {
        const challenges = await Challenge.find().sort('-difficulty');
        let activ = []
        challenges.forEach((challenge) => {
            let flag = false;
            req.body.challenges.forEach((chal) => {

                if (chal == challenge._id) {
                    flag = true;

                }
            });
            if (!flag) {
                activ.push(challenge);
            }

        }
        );

        res.send(activ);
        //res.send(challenges);
    }),

    router.post('/', [auth, admin], async (req, res) => {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let challenge = new Challenge(_.pick(req.body, ['name', 'description', 'activities', 'difficulty', 'color', 'image']));
        challenge = await challenge.save();
        res.send(_.pick(challenge, ['name', 'description', 'activities', 'number', 'difficulty']));
    });

module.exports = router;