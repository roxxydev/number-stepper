/* eslint no-console: 0 */
'use strict';

require('./src/server')();

process.on('unhandledRejection', (reason, p) => {

    console.log('Unhandled Rejection at:', p, 'reason:', reason);
});
