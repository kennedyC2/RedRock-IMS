// Dependencies
// ========================================================================================
var file = require('./data');
var checkToken = require('./handler');


// Container for handler
// =========================================================================================
var handler = {};

// =========================================================================================
//                                         customers
// =========================================================================================

// handler.users
// =========================================================================================
handler.customer = function (data, callback) {
    var acceptableMethods = ['get', 'delete', 'options'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        if (data.method == 'options') {
            callback(200, {});
        } else {
            handler.customerMethods[data.method](data, callback);
        }
    } else {
        callback(405);
    }
};

// Customer Methods
// ==========================================================================================
handler.customerMethods = {};

// Get method
handler.customerMethods.get = function (data, callback) {
    // Define Collectables
    var companyID = typeof (data.queryStringObject.company) == 'string' && data.queryStringObject.company.trim().length > 5 ? data.queryStringObject.company.trim() : false;
    var token_ID = typeof (data.header.token) == 'string' && data.header.token.trim().length > 15 ? data.header.token.trim() : false;
    if (companyID && token_ID) {
        // Validate token
        checkToken.validateToken('tokens', token_ID, function (tokenIsValid) {
            if (tokenIsValid) {
                // Get file list
                file.list('customers/' + companyID, function (err, customerList) {
                    if (!err && customerList) {
                        var customerArray = [];
                        // Loop and read
                        for (const prop of customerList) {
                            file.read('customers/' + companyID, prop, function (err, customerData) {
                                if (!err && customerData) {
                                    customerArray.push(customerData);

                                    if (prop == customerList[customerList.length - 1]) {
                                        callback(200, customerArray);
                                    }
                                } else {
                                    callback(500, {
                                        Error: 'Could not read file'
                                    });
                                }
                            });
                        }
                    } else {
                        var msg = [];
                        callback(200, msg);
                    }
                });
            } else {
                callback(400, {
                    Error: 'Expired Token Key'
                });
            }
        })
    } else {
        callback(400, {
            Error: 'Missing Required Fields'
        });
    }
};

// Delete Method
handler.customerMethods.delete = function (data, callback) {
    // Define Collectables
    var companyID = typeof (data.queryStringObject.company) == 'string' && data.queryStringObject.company.trim().length > 5 ? data.queryStringObject.company.trim() : false;
    var email = typeof (data.queryStringObject.email) == 'string' && data.queryStringObject.email.trim().length > 0 ? data.queryStringObject.email.trim() : false;
    var token_ID = typeof (data.header.token) == 'string' && data.header.token.trim().length > 15 ? data.header.token.trim() : false;
    if (companyID && token_ID && email) {
        // Validate token
        checkToken.validateToken('tokens', token_ID, function (tokenIsValid) {
            if (tokenIsValid) {
                // Look_Up customer
                file.read('customers/' + companyID, email, function (err, customerData) {
                    if (!err && customerData) {
                        file.delete('customers/' + companyID, email, function (err) {
                            if (!err) {
                                callback(200, {
                                    Status: 'Success',
                                });
                            } else {
                                callback(500, {
                                    Error: 'Could Not Delete File'
                                });
                            }
                        });
                    } else {
                        callback(400, {
                            Error: 'customer Does Not Exist'
                        });
                    }
                });
            } else {
                callback(400, {
                    Error: 'Expired Token Key'
                });
            }
        });
    } else {
        callback(400, {
            Error: 'Missing Required Fields'
        });
    }
};

// Export Module
module.exports = handler;