'use strict';

class NumberService {

    constructor(app) {
        if (!app.ready) {

            throw new Error('Can\'t get .ready from fastify app.');
        }

        this.app = app;
    }

    async step(action) {
        if (action === 'increment') {
            return await this.app.db.updateNumber(1);
        }
        else if (action === 'decrement') {
            return await this.app.db.updateNumber(-1);
        }

        throw this.app.httpErrors.badRequest('Invalid step action. Value should either be increment or decrement only.');
    }

    async getCurrentValue() {
        return this.app.db.getCurrentValue();
    }
}

module.exports = {
    NumberService
};
