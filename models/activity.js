const Joi = require('joi');
const mongoose = require('mongoose');

const Activity = mongoose.model('Activity', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 5
    }
}));

function validateActivity(activity) {
    const schema = {
        name: Joi.string().min(3).max(20).required(),
        description: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(activity, schema);
}

exports.Activity = Activity;
exports.validate = validateActivity;