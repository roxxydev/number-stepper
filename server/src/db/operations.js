'use strict';

const Mongoose = require('mongoose');
const { numberSchema } = require('./schema/number');

const getCurrentValue = async () => {

    const NumberModel = Mongoose.model('Number', numberSchema);
    const count = await NumberModel.count({});

    if (!count) {
        const numberDoc = new NumberModel({ name: 'number', value: 0 });
        await numberDoc.save();
    }

    const numberDoc = await NumberModel.findOne({ name: 'number' }).exec();
    return numberDoc.value;
};

const updateNumber = async (numberToAdd) => {

    const NumberModel = Mongoose.model('Number', numberSchema);
    const currentValue = await getCurrentValue();

    const newValue = currentValue + numberToAdd;

    const numberDoc = await NumberModel.findOneAndUpdate({ name: 'number' }, { value: newValue }, {
        new: true
    });
    return numberDoc.value;
};

const resetNumber = async () => {

    const NumberModel = Mongoose.model('Number', numberSchema);

    const numberDoc = await NumberModel.findOneAndUpdate({ name: 'number' }, { value: 0 }, {
        new: true
    });
    return numberDoc.value;
};

module.exports = {
    getCurrentValue,
    updateNumber,
    resetNumber
};
