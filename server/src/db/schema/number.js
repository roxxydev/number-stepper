'use strict';

const Mongoose = require('mongoose');

const numberSchema = new Mongoose.Schema({
    name: String,
    value: Number
});

module.exports = {
    numberSchema
};
