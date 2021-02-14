// Dependencies
// ========================================================================================
var file = require('./data');
var checkToken = require('./handler');
var helper = require('./helper');


// Container for handler
// =========================================================================================
var handler = {};

// =========================================================================================
//                                         purchases
// =========================================================================================

// handler.users
// =========================================================================================
handler.purchase = function (data, callback) {
    var acceptableMethods = ['post', 'get', 'delete', 'options'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        if (data.method == 'options') {
            callback(200, {});
        } else {
            handler.purchaseMethods[data.method](data, callback);
        }
    } else {
        callback(405);
    }
};

// Purchase Methods
// ==========================================================================================
handler.purchaseMethods = {};


// Post Method
handler.purchaseMethods.post = function (data, callback) {
    // Define Collectables
    var companyID = typeof (data.payload.company) == 'string' && data.payload.company.toString().trim().length > 5 ? data.payload.company.toString().trim() : false;
    var token_ID = typeof (data.header.token) == 'string' && data.header.token.trim().length > 15 ? data.header.token.trim() : false;
    if (companyID && token_ID) {
        // Validate token
        checkToken.validateToken('tokens', token_ID, function (tokenIsValid) {
            if (tokenIsValid) {
                // Other Collectables
                var customerName = typeof (data.payload.name) == 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
                var purchaseQuantity = typeof (data.payload.quantity) == 'string' && data.payload.quantity.trim().length > 0 ? parseInt(data.payload.quantity.trim()) : false;
                var email = typeof (data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim().toLowerCase() : false;
                var phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length > 0 ? data.payload.phone.trim() : false;
                var productId = typeof (data.payload.pid) == 'string' && data.payload.pid.trim().length > 0 ? data.payload.pid.trim().toLowerCase() : false;
                var productName = typeof (data.payload.pname) == 'string' && data.payload.pname.trim().length > 0 ? data.payload.pname.trim().toLowerCase() : false;
                var time = typeof (data.payload.time) == 'string' && data.payload.time.trim().length > 0 ? data.payload.time.trim() : false;
                if (customerName && purchaseQuantity && email && phone && productId && productName && time) {
                    var date = Date.now();
                    var purchase_ID = helper.createRandomString(20) + date;
                    file.read('products/' + companyID, productName, function (err, productData) {
                        if (!err && productData) {
                            // Define purchaseObject
                            var purchaseObject = {
                                'Customer_Name': customerName,
                                'Quantity': purchaseQuantity,
                                'Email': email,
                                'Phone_no': phone,
                                'Product_ID': productId,
                                'Purchase_ID': purchase_ID,
                                'Product_Name': productName,
                                'Total': purchaseQuantity * productData.Sell_Price,
                                'Date': date,
                                'Time': time
                            };

                            // Update Purchase
                            file.create('purchases/' + companyID, purchase_ID, purchaseObject, function (err, purchaseData) {
                                if (!err && purchaseData) {
                                    // Adjust product quantity
                                    file.read('products/' + companyID, productName, function (err, productData) {
                                        if (!err && productData) {
                                            if (parseInt(productData.Product_Quantity) > parseInt(purchaseQuantity) && parseInt(productData.Product_Quantity) > 0) {
                                                productData.Product_Quantity -= purchaseQuantity;
                                                // Update file
                                                file.update('products/' + companyID, productName, productData, function (err) {
                                                    if (!err) {
                                                        // Save Customer
                                                        var customerObject = {
                                                            'Customer_Name': customerName,
                                                            'Email': email,
                                                            'Phone_no': phone
                                                        };

                                                        // Update Info
                                                        file.create('customers/' + companyID, email, customerObject, function (err) {
                                                            if (!err) {
                                                                callback(200, {
                                                                    Status: 'Success',
                                                                });
                                                            } else {
                                                                file.update('customers/' + companyID, email, customerObject, function (err) {
                                                                    if (!err) {
                                                                        callback(200, {
                                                                            Status: 'Success',
                                                                        });
                                                                    } else {
                                                                        callback(500, {
                                                                            Error: 'Could Not Update Customer file'
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    } else {
                                                        callback(500, {
                                                            Error: 'Could Not Update Product file'
                                                        });
                                                    }
                                                });
                                            } else {
                                                callback(400, {
                                                    Error: 'Purchase Quantity Is Above Stock'
                                                });
                                            }
                                        } else {
                                            callback(500, {
                                                Error: 'Could Not Read Product Data'
                                            });
                                        }
                                    })
                                } else {
                                    callback(500, {
                                        Error: 'Could Not Create Purchase File'
                                    });
                                }
                            });
                        } else {
                            callback(400, {
                                Error: 'Specified Product Does Not Exist'
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
};

// Get method
handler.purchaseMethods.get = function (data, callback) {
    // Define Collectables
    var companyID = typeof (data.queryStringObject.company) == 'string' && data.queryStringObject.company.trim().length > 5 ? data.queryStringObject.company.trim() : false;
    var token_ID = typeof (data.header.token) == 'string' && data.header.token.trim().length > 15 ? data.header.token.trim() : false;
    if (companyID && token_ID) {
        // Validate token
        checkToken.validateToken('tokens', token_ID, function (tokenIsValid) {
            if (tokenIsValid) {
                // Get file list
                file.list('purchases/' + companyID, function (err, purchaseList) {
                    if (!err && purchaseList) {
                        var purchaseArray = [];
                        // Loop and read
                        for (const prop of purchaseList) {
                            file.read('purchases/' + companyID, prop, function (err, purchaseData) {
                                if (!err && purchaseData) {
                                    purchaseArray.push(purchaseData);

                                    if (prop == purchaseList[purchaseList.length - 1]) {
                                        callback(200, purchaseArray);
                                    };
                                } else {
                                    callback(500, {
                                        Error: 'Could not read file'
                                    });
                                }
                            });
                        }
                        // callback(200, purchaseArray);
                    } else {
                        var productArray = [];
                        callback(200, productArray);
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

// Delete Method
handler.purchaseMethods.delete = function (data, callback) {
    // Define Collectables
    var companyID = typeof (data.queryStringObject.company) == 'string' && data.queryStringObject.company.trim().length > 5 ? data.queryStringObject.company.trim() : false;
    var purchase_ID = typeof (data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length > 0 ? data.queryStringObject.id.trim().toLowerCase() : false;
    var token_ID = typeof (data.header.token) == 'string' && data.header.token.trim().length > 15 ? data.header.token.trim() : false;
    if (companyID && token_ID && purchase_ID) {
        // Validate token
        checkToken.validateToken('tokens', token_ID, function (tokenIsValid) {
            if (tokenIsValid) {
                // Look_Up purchase
                file.read('purchases/' + companyID, purchase_ID, function (err, purchaseData) {
                    if (!err && purchaseData) {
                        file.delete('purchases/' + companyID, purchase_ID, function (err) {
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
                            Error: 'Purchase Does Not Exist'
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