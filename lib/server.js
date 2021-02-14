// Dependencies
// ==================================================================================================
var http = require('http');
var https = require('https');
var url = require('url');
var stringDecoder = require('string_decoder').StringDecoder;
var fs = require('fs');
var path = require('path');
var config = require('./config');
var helper = require('./helper');
var handler = require('./handler');
var render = require('./render');
var product = require('./product');
var purchase = require('./purchase');
var customer = require('./customer');
var sales = require('./sales');
var formidable = require('formidable');
var file = require('./data');
const payment = require('./payment');
var mail = require('./mailing');

// Container For Server Options
var server = {};

// Dp Path
var tokenPath = path.join(__dirname, '../.data/tokens/');
var dpPath = path.join(__dirname, '../assets/default/')

// Instantiate http server
// ====================================================================================================
server.httpServer = http.createServer(function (req, res) {
    server.unifiedServer(req, res);
});

// Instantiate https server
// =====================================================================================================
server.httpsServerOptions = {
    'key': fs.readFileSync(path.join(__dirname, '../https/key.pem')),
    'cert': fs.readFileSync(path.join(__dirname, '../https/cert.pem'))
};

server.httpsServer = https.createServer(server.httpsServerOptions, function (req, res) {
    server.unifiedServer(req, res);
});

// Configure server to respond to all requests
// ======================================================================================================
server.unifiedServer = function (req, res) {
    // Parse Url 
    var parsedUrl = url.parse(req.url, true);

    // Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get queryString as object
    var queryStringObject = parsedUrl.query;

    // Get method
    var method = req.method.toLowerCase();

    // Get header
    var header = req.headers;

    // Get Images if available
    if (path == '/picture') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            console.log(files)
            if (!err) {
                for (const prop in files) {
                    fs.readFile(tokenPath + prop + '.json', 'utf-8', function (err, data) {
                        console.log(data);
                        if (!err && data) {
                            var tokenData = JSON.parse(data);
                            fs.readFile(files[prop].path, function (err, image) {
                                if (!err && image) {
                                    var exTn = '';
                                    if (files[prop].type == 'image/jpeg') {
                                        exTn = '.jpg';
                                    }

                                    if (files[prop].type == 'image/png') {
                                        exTn = '.png';
                                    }

                                    fs.writeFile(dpPath + tokenData.User_ID + exTn, image, function (err) {
                                        if (!err) {
                                            file.read('users', tokenData.Email, function (err, userData) {
                                                if (!err && userData) {
                                                    userData.Profile_Pic = tokenData.User_ID + exTn;
                                                    file.update('users', userData.Email, userData, function (err) {
                                                        if (!err) {
                                                            res.end();
                                                        } else {
                                                            console.log(err);
                                                        }
                                                    });
                                                } else {
                                                    console.log(err);
                                                }
                                            });
                                        } else {
                                            console.log(err);
                                        }
                                    });
                                } else {
                                    console.log(err)
                                }
                            });
                        } else {
                            console.log(err)
                        }
                    });
                }
            }
        });
    };

    // Get payload if any
    var decoder = new stringDecoder('utf-8');
    var buffer = '';
    req.on('data', function (data) {
        buffer += decoder.write(data);
    });

    req.on('end', function () {
        buffer += decoder.end();

        // Confirm path and send to the right handler
        var chosenHandler = typeof (server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : render.notFound;

        // if the request is within the public directory, route to the public handler
        chosenHandler = trimmedPath.indexOf('assets/') > -1 ? render.assets : chosenHandler;

        //  Define data
        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'header': header,
            'path': path,
            'payload': helper.parseObject(buffer)
        }

        // Route request to handler
        chosenHandler(data, function (statusCode, message, content) {
            // Handler Error
            try {
                server.handlerProcessor(res, data, statusCode, message, content);
            } catch (e) {
                console.log(e);
                server.handlerProcessor(res, data, 500, {
                    'Error': 'An unknown error has occurred'
                }, 'json');
            }
        });
    });
};

// Handler Processor
server.handlerProcessor = function (res, data, statusCode, message, content) {
    // Use status code from handler or default to 200
    var status_Code = typeof (statusCode) == 'number' ? statusCode : 200;

    // Specify content type
    var contentType = typeof (content) == 'string' ? content : 'json';

    // Use message from handler
    var response = '';
    if (contentType == 'json') {
        res.setHeader('Content-type', 'application/json');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
        response = typeof (message) == 'object' ? JSON.stringify(message) : {};
        res.writeHead(status_Code);
        res.end(response);
    }

    if (contentType == 'html') {
        res.setHeader('Content-type', 'text/html');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
        response = typeof (message) == 'string' ? message : {};
        res.writeHead(status_Code);
        res.end(response);
    }

    if (contentType == 'plain') {
        res.setHeader('Content-type', 'text/plain');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
        response = typeof (message) !== 'undefined' ? message : {};
        res.writeHead(status_Code);
        res.end(response);
    }

    if (contentType == 'css') {
        res.setHeader('Content-type', 'text/css');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
        response = typeof (message) !== 'undefined' ? message : {};
        res.writeHead(status_Code);
        res.end(response);
    }

    if (contentType == 'jpg') {
        res.setHeader('Content-type', 'image/jpg');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
        response = typeof (message) !== 'undefined' ? message : {};
        res.writeHead(status_Code);
        res.end(response);
    }

    if (contentType == 'png') {
        res.setHeader('Content-type', 'image/png');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
        response = typeof (message) !== 'undefined' ? message : {};
        res.writeHead(status_Code);
        res.end(response);
    }

    if (contentType == 'svg') {
        res.setHeader('Content-type', 'image/svg+xml');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
        response = typeof (message) !== 'undefined' ? message : {};
        res.writeHead(status_Code);
        res.end(response);
    }

    if (contentType == 'ico') {
        res.setHeader('Content-type', 'image/x-icon');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
        response = typeof (message) !== 'undefined' ? message : {};
        res.writeHead(status_Code);
        res.end(response);
        mail.companyNote({firstname:"kennedy",lastname:"c. young",company_Name:"madi's collection",user_ID:"M1604522991321",email:"madipresh12@gmail.com",phone:"08178359407",Password:"21022f6d559c4791de6ca23261ac7c197cb7d26768060d948c49b488bb74ffd2",address:"obinze, owerri",Notification:"on",Profile_Pic:"profilepic.png",Threshold:"10",Last_Payment:"T388654272982882",subscription:"1 month",charge:7500,expiry:1605732591321,active:true});
    }

    // Return response
    // console.log(data);
}


//  Define router
//  ====================================================================================
server.router = {
    '': render.index,
    'app': render.app,
    'ping': handler.ping,
    'favicon.ico': render.favicon,
    'product': product.product,
    'purchase': purchase.purchase,
    'customer': customer.customer,
    'session': handler.token,
    'user': handler.user,
    'picture': handler.picture,
    'sales': sales.sales,
    'totalSales': sales.totalSales,
    'charts': sales.charts,
    'purchaseID': sales.productById,
    'payment': payment.renew
};

// Initialize Server
server.init = function () {
    // Start server
    server.httpServer.listen(config.httpPort, function () {
        console.log('Server has started on port ' + config.httpPort + ' with ' + config.envName + ' mode');
    });

    server.httpsServer.listen(config.httpsPort, function () {
        console.log('Server has started on port ' + config.httpsPort + ' with ' + config.envName + ' mode');
    });
};

// Export Module
module.exports = server;