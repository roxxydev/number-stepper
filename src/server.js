/* eslint no-console: 0 */
'use strict';

const Fastify = require('fastify');
const FastifySensible = require('fastify-sensible');
const Routes = require('./api');
const Dotenv = require('dotenv');

module.exports = async () => {

    Dotenv.config();
    const API_PREFIX = process.env.API_PREFIX;

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

    // Using MongoDB
    /*
    await fastify.register(Store, {
        mapper: 'mongoose',
        dir: Path.resolve(`${__dirname}/models/operations`),
        client: config.DB_CLIENT,
        connection: {
            host: config.DB_HOST,
            port: config.DB_PORT,
            user: config.DB_USER,
            password: config.DB_PASSWORD,
            database: config.DB_NAME
        }
    });
    */

    await fastify.register(FastifySensible);

    fastify.log.info('Setting up routes...');
    await fastify.ready(() => {

        fastify.log.info(`Added routes:\n${ fastify.printRoutes() }`);
    });

    await fastify.register(Routes, { prefix: API_PREFIX });

    try {
        await fastify.listen(3000);
        fastify.log.info(fastify.initialConfig, 'Intiialized server with config: ');
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }

    return fastify;
};
