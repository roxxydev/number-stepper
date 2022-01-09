'use strict';

const { NumberService } = require('./numberService');

const numberRoutes = (app, options, done) => {

    const numberService = new NumberService(app);

    // POST /step?query={increment or decrement} - Increment or decrement current number value.
    app.post('/step', async (request, reply) => {

        const { action } = request.query;
        const number = await numberService.step(action);

        return reply.send({ value: number });
    });

    // GET / - Returns current number value stored.
    app.get('/', async (request, reply) => {

        const number = await numberService.getCurrentValue();

        return reply.send({ value: number });
    });

    done();
};

module.exports = numberRoutes;
