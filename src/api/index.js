'use strict';

const apiRoutes = (fastify, options, done) => {

    fastify.get('/', () => {

        return {};
    });

    fastify.register(require('./number'), { prefix: 'number' });

    done();
};

module.exports = apiRoutes;
