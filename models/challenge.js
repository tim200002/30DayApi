const Joi = require('joi');
const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const Challenge = mongoose.model('Challenge', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 5
    },
    //Array of All Activities in the Challenge referenced by ID
    activities: [{ type: ObjectId, ref: 'Activity' }],
    //How many Activities are in the challenge
    difficulty: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },

    //Color String in the format 
    //b74093
    color: String,

    //Path to the image in the format 'images/checkedVar2.png'
    image: String,
}));

function validateChallenge(user) {
    const schema = {
        name: Joi.string().min(3).max(20).required(),
        description: Joi.string().min(5).max(80).required(),
        activities: Joi.required(),
        difficulty: Joi.number().required(),
        color: Joi.string(),
        image: Joi.string()
    }
    return Joi.validate(user, schema);
}

exports.Challenge = Challenge;
exports.validate = validateChallenge;