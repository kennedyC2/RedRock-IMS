/*
 *
 * API Loader
 *
 */


// Dependencies
var server = require('./lib/server');
var cli = require('./lib/cli');
var workers = require('./lib/worker');
var payment = require('./lib/payment');


// declare App
var app = {};

// init function for kick
app.init = function () {
    // initiate server
    server.init();

    // initiate cli
    setTimeout(() => {
        cli.init();
        setInterval(() => {
            workers.cleanTokenFolder();
        }, 1000 * 60 * 30);
        setInterval(() => {
            payment.update();
        }, 1000 * 60 * 60);
    }, 50);
};



// self executing
app.init();


// export the app
module.exports = app;