// Dependencies
// ==========================================================================
var readline = require('readline');
var os = require('os');
var v8 = require('v8');
var events = require('events');
class _events extends events{}
var e = new _events();
var file = require('./data');


// Container for Cli 
// =================================================================================
var cli = {};


// Initiate script
// =================================================================================
cli.init = function () {
    // prompt start up
    console.log('CLI has started running');

    // Create interface 
    var interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: ''
    });

    // create an initial prompt
    interface.prompt();

    // Handle each line input separately
    interface.on('line', function (str) {
        // send input to processor
        cli.processInput(str);

        // bring back prompt after processing
        interface.prompt();
    });

    // kill cli if user issues a stop
    interface.on('close', function () {
        process.exit(0);
    });
};

// Input processor
// =======================================================================================
cli.processInput = function (str) {
    str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : false;
    if (str) {
        // streamline user input
        var userInput = [
            'stats',
            'list users',
            'more user info',
            'exit'
        ];
        
        // loop thru userInput to find match
        var matchFound = false;
        userInput.forEach(input => {
            if (str.toLowerCase().indexOf(input) > -1) {
                matchFound = true;
                e.emit(input, str);
                return true;
            }
        });

        if(!matchFound) {
            console.log('Not found');
        }
    }
};

// input Handlers
// ==============================================================================================
e.on('stats', function(str) {
    cli.responder.stats();
});

e.on('list users', function(str) {
    cli.responder.listUsers();
});

e.on('more user info', function(str) {
    cli.responder.moreUserInfo(str);
});

e.on('exit', function(str) {
    cli.responder.exit();
});

// cli responders
// ====================================================================================
cli.responder = {};

// help responder
cli.responder.help = function () {
    var commands = {
        'stats' : 'Get statistics on underlying operating system and resource utilization', 
        'list users' : 'Show list of all registered users in the system',
        'more user info --{userId}' : 'Show details of a specified user'
    };

    cli.horizontalLine();
    cli.centered('CLI MANUAL');
    cli.horizontalLine();
    cli.verticalSpace(2);

    // loop thru each command
    for (const d in commands) {
        var line = '           ';
        line += d;
        var padding = 65 - (line.length);
        for (var i = 0 ; i < padding ; i++) {
            line += ' ';
        }
        
        line += commands[d];
        console.log(line);
        cli.verticalSpace(2);

    }

    cli.verticalSpace(1);

    // End with horizontal line
    cli.horizontalLine();
};

// exit responder
cli.responder.exit = function () {
    process.exit(0);
};

// stats responder
cli.responder.stats = function () {
    var stats = {
        'load Average' : os.loadavg().join(' '),
        'CPU Count' : os.cpus().length,
        'Free memory' : os.freemem(),
        'Current Malloced Memory' : v8.getHeapStatistics().malloced_memory,
        'Peak Malloced Memory' : v8.getHeapStatistics().peak_malloced_memory,
        'Allocated Heap Used (%)' : Math.round((v8.getHeapStatistics().used_heap_size/v8.getHeapStatistics().total_heap_size) * 100),
        'Available Heap Allocated (%)' : Math.round((v8.getHeapStatistics().total_heap_size/v8.getHeapStatistics().heap_size_limit) * 100),
        'Uptime' : os.uptime() + ' Seconds'
    };

    cli.horizontalLine();
    cli.centered('SYSTEM STATISTICS');
    cli.horizontalLine();
    cli.verticalSpace(2);

    // loop thru each command
    for (const d in stats) {
        var line = '           ';
        line += d;
        var padding = 65 - (line.length);
        for (var i = 0 ; i < padding ; i++) {
            line += ' ';
        }
        
        line += stats[d];
        console.log(line);
        cli.verticalSpace(2);

    }

    cli.verticalSpace(1);

    // End with horizontal line
    cli.horizontalLine();
};

// list users responder
cli.responder.listUsers = function () {
    file.list('users', function (err, userIds) {
        if (!err && userIds) {
            cli.verticalSpace();
            for (const d of userIds) {
                console.log(d);
            }
        } else {
            console.log(err);
        }
    });
};

// more user info responder
cli.responder.moreUserInfo = function (str) {
    var arr = str.split('--');
    var userId = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
    if (userId) {
        file.read('users', userId, function (err, userData) {
            if (!err && userData) {
                cli.verticalSpace();
                delete userData.password;
                console.log(userData, {'colors' : true});
            } else {
                console.log(err);
            }
        });
    }
};

// Space/Line handlers
// ========================================================================================

// Vertical Space
cli.verticalSpace = function (lines) {
    line = typeof(lines) == 'number' && lines > 0 ? lines : 1;
    for (var i = 0 ; i < line ; i++) {
        console.log(' ');
    }
};

// Horizontal line
cli.horizontalLine = function () {
    // Get the available screen size
    var width = process.stdout.columns;

    // put in enough dashes to go across the screen
    var line = '';
    for (var i = 0 ; i < width ; i++) {
        line += '-';
    }

    console.log(line);
};

// Center text
cli.centered = function (str) {
    str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : ' ';

    // Get available screen width
    var width = process.stdout.columns;

    //calculate padding needed
    var leftPadding = Math.floor((width - str.length) / 2);

    // put left padding before str
    var line = '';
    for (var i = 0 ; i < leftPadding ; i++) {
        line += ' ';
    }

    line += str;
    console.log(line);
}




//  Export module
// ======================================================================================
module.exports = cli;