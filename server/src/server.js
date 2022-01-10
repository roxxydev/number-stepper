/* eslint no-console: 0 */
'use strict';

const Fastify = require('fastify');
const FastifySensible = require('fastify-sensible');
const Dotenv = require('dotenv');
const Routes = require('./api');
const Db = require('./db');

module.exports = async () => {

    Dotenv.config();

    // level: trace - log all, error - log only ERROR
    const logger = {
        level: 'trace',
        prettyPrint: true,
        serializers: {
            res(reply) {

                return {
                    statusCode: reply.statusCode
                };
            },
            req(request) {

                return {
                    method: request.method,
                    url: request.url,
                    path: request.path,
                    parameters: request.parameters,
                    headers: request.headers
                };
            }
        }
    };

    const fastify = Fastify({
        logger,
        ignoreTrailingSlash: true,
        maxParamLength: 200
    });

    await fastify.addHook('onSend', (request, reply, payload, done) => {

        if (payload) {
            fastify.log.debug({ body: payload }, `response payload reqId: ${ request.id }`);
        }

        done();
    });

    await fastify.addHook('preValidation', (request, reply, done) => {

        if (request && request.body) {
            fastify.log.debug({ body: request.body }, `request payload reqId: ${ request.id }`);
        }

        done();
    });

    await Db.connect();
    fastify.db = Db.operations;

    await fastify.register(FastifySensible);
    await fastify.register(require('fastify-cors'));

    fastify.log.info('Setting up routes...');
    await fastify.ready(() => {

        fastify.log.info(`Added routes:\n${ fastify.printRoutes() }`);
    });

    const API_PREFIX = process.env.API_PREFIX;
    await fastify.register(Routes, { prefix: API_PREFIX });

    try {
        await fastify.listen(3000);
        fastify.log.info(fastify.initialConfig, 'Intiialized server with config: ');
    }
    catch (err) {
        await Db.close();
        fastify.log.error(err);
        process.exit(1);
    }

    return fastify;
};
