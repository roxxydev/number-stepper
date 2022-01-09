'use strict';

const Mongoose = require('mongoose');
const operations = require('./operations');

const connect = async () => {

    const dbName = process.env.DB_NAME;
    const dbPort = process.env.DB_PORT;
    await Mongoose.connect(`mongodb://localhost:${dbPort}/${dbName}`);
};

const close = async () => {

    await Mongoose.connection.close();
};

module.exports = {
    connect,
    close,
    operations
};
