'use strict';

class NumberService {

    constructor(app) {
        if (!app.ready) {

            throw new Error('Can\'t get .ready from fastify app.');
        }

        this.app = app;
        this.number = 0;

        // if (!app.db) {

        //     throw new Error('Can\'t get db from fastify app.');
        // }

        // this.db = app.db;
    }

    async step(action) {
        if (action === 'increment') {
            this.number++;
            return this.number;
        }
        else if (action === 'decrement') {
            this.number--;
            return this.number;
        }

        throw this.app.httpErrors.badRequest('Invalid step action. Value should either be increment or decrement only.');
    }

    async getCurrentValue() {
        return this.number;
        // throw this.app.httpErrors.notFound('Current value not existing.');
    }
}

module.exports = {
    NumberService
};
