var config = require('./config');
var payStack = require('paystack-api')(config.liveKey);
var file = require('./data');
var checkToken = require('./handler');


// Container for Payment functions
var payment = {};

// Payment Verification
// =========================================================================================
payment.verifyPayment = function (ref, callback) {
    var reference = ref;
    payStack.transaction.verify({
        reference: reference
    }).then(function (body, error) {
        if (!error && body) {
            if (body.data.status == 'success') {
                var cardDetails = body.data.authorization;
                callback(false, cardDetails);
            } else {
                callback(true);
            }
        } else {
            console.log(error);
            callback(true);
        }
    });
};


// Renew payment
payment.update = function () {
    // Get list of users
    file.list('users', function (err, userList) {
        if (!err && userList.length > 0) {
            // Read user file
            for (const prop of userList) {
                file.read('users', prop, function (err, userData) {
                    if (!err && userData) {
                        console.log(userData.Expiry)
                        if (userData.Expiry > Date.now()) {
                            var email = userData.Email;
                            var charge = (userData.Charge * 100).toString();
                            var code = userData.Card_Details.authorization_code;
                            payStack.transaction.chargeAuth({
                                authorization_code: code,
                                email: email,
                                amount: charge,
                            }).then(function (body, error) {
                                if (!error && body) {
                                    if (body.data.status == 'success') {
                                        var subscription = userData.Subscription;
                                        var expiry = '';
                                        if (subscription = '1 month') {
                                            expiry = Date.now() + 1000 * 60 * 60 * 24 * 30;
                                        }
                                        if (subscription = '3 month') {
                                            expiry = Date.now() + 1000 * 60 * 60 * 24 * 30 * 3;
                                        }
                                        if (subscription = '1 year') {
                                            expiry = Date.now() + 1000 * 60 * 60 * 24 * 30 * 12;
                                        }


                                        var reference = body.data.reference;
                                        userData.Expiry = expiry;
                                        userData.Last_Payment = reference;

                                        // Update new date
                                        file.update('users', prop, userData, function (err) {
                                            if (!err) {
                                                console.log('Payment Updated Successfully')
                                            }
                                        });
                                    } else {
                                        userData.Active = false;
                                        // Update new date
                                        file.update('users', prop, userData, function (err) {
                                            if (!err) {
                                                console.log('Payment Updated Sucessfully')
                                            }
                                        });
                                    }
                                } else {
                                    console.log(error);
                                }
                            });
                        }
                    }
                });
            }
        } else {
            console.log('User List Is empty');
        }
    });
};

// Update payment
payment.renew = function (data, callback) {
    var acceptableMethods = ['put', 'options'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        if (data.method == 'options') {
            callback(200, {});
        } else {
            payment.paymentMethods[data.method](data, callback);
        }
    } else {
        callback(405);
    }
};

// Payment Methods
// =========================================================================================
payment.paymentMethods = {};

// Put Method
payment.paymentMethods.put = function (data, callback) {
    // Define Collectables
    var companyID = typeof (data.payload.company) == 'string' && data.payload.company.toString().trim().length > 5 ? data.payload.company.toString().trim() : false;
    var token_ID = typeof (data.header.token) == 'string' && data.header.token.trim().length > 15 ? data.header.token.trim() : false;
    if (companyID && token_ID) {
        // Validate token
        checkToken.validateToken('tokens', token_ID, function (tokenIsValid) {
            if (tokenIsValid) {
                var email = typeof (data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
                var refer = typeof (data.payload.reference) == 'string' && data.payload.reference.trim().length > 0 ? data.payload.reference.trim() : false;
                var charge = typeof (data.payload.charge) == 'string' && data.payload.charge.trim().length > 0 ? parseInt(data.payload.charge.trim()) : false;
                if (email && refer && charge) {
                    // Confirm Payment
                    payment.verifyPayment(refer, function (err, cardDetails) {
                        if (!err && cardDetails) {
                            // Look up user
                            file.read('users', email, function (err, userData) {
                                if (!err && userData) {
                                    var subscription = '';
                                    var expiry = '';
                                    if (charge == 7500) {
                                        subscription = '1 month';
                                        expiry = Date.now() + 1000 * 60 * 60 * 24 * 30;
                                    }
                                    if (charge == 22500) {
                                        subscription = '3 month';
                                        expiry = Date.now() + 1000 * 60 * 60 * 24 * 30 * 3;
                                    }
                                    if (charge == 75000) {
                                        subscription = '1 year';
                                        expiry = Date.now() + 1000 * 60 * 60 * 24 * 30 * 12;
                                    }

                                    // Update data
                                    userData.Subscription = subscription;
                                    userData.Expiry = expiry;
                                    userData.Charge = charge;
                                    userData.Active = true;
                                    userData.Card_Details = cardDetails;
                                    userData.Last_Payment = refer;

                                    // Update file
                                    file.update('user', email, userData, function (err) {
                                        if (!err) {
                                            callback(200, {
                                                Status: 'Success'
                                            });
                                        } else {
                                            callback(200, {
                                                'Error': 'Payment Renewal Not Successful, Try Again'
                                            });
                                        }
                                    })
                                } else {
                                    callback(400, {
                                        'Error': 'User Does Not Exist'
                                    });
                                }
                            });
                        } else {
                            callback(500, {
                                'Error': 'Payment Verification Failed, Contact Customer Care'
                            });
                        }
                    });
                } else {
                    callback(400, {
                        Error: 'Missing Required Fields'
                    });
                }
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
}

// Export Modules
module.exports = payment;