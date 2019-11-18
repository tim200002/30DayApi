const { Activity, validate } = require('../models/activity');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');

//Get all Activities
router.get('/', async (req, res) => {
    const activities = await Activity.find().sort({ name: 1 });
    res.send(activities);
});


//Create new activity
router.post('/', [auth, admin], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let activity = new Activity(_.pick(req.body, ['name', 'description']));
    activity = await activity.save();
    res.send(_.pick(activity, ['description', 'name']));
});

module.exports = router;