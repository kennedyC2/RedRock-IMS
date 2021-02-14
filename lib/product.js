// Dependencies
// ========================================================================================
var file = require('./data');
var checkToken = require('./handler');


// Container for handler
// =========================================================================================
var handler = {};

// =========================================================================================
//                                         Products
// =========================================================================================

// handler.products
// =========================================================================================
handler.product = function (data, callback) {
    var acceptableMethods = ['post', 'get', 'delete', 'options'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        if (data.method == 'options') {
            callback(200, {});
        } else {
            handler.productMethods[data.method](data, callback);
        }
    } else {
        callback(405);
    }
};

// Product Methods
// ==========================================================================================
handler.productMethods = {};

// Post Method
handler.productMethods.post = function (data, callback) {
    // Define Collectables
    var companyID = typeof (data.payload.company) == 'string' && data.payload.company.toString().trim().length > 5 ? data.payload.company.toString().trim() : false;
    var token_ID = typeof (data.header.token) == 'string' && data.header.token.trim().length > 15 ? data.header.token.trim() : false;
    if (companyID && token_ID) {
        // Validate token
        checkToken.validateToken('tokens', token_ID, function (tokenIsValid) {
            if (tokenIsValid) {
                // Other Collectables
                var productName = typeof (data.payload.name) == 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim().toLowerCase() : false;
                var productQuantity = typeof (data.payload.quantity) == 'string' && data.payload.quantity.trim().length > 0 ? data.payload.quantity.trim() : false;
                var costPrice = typeof (data.payload.cost) == 'string' && data.payload.cost.trim().length > 0 ? data.payload.cost.trim() : false;
                var sellPrice = typeof (data.payload.sell) == 'string' && data.payload.sell.trim().length > 0 ? data.payload.sell.trim() : false;
                var expiryDate = typeof (data.payload.expiry) == 'string' && data.payload.expiry.trim().length > 0 ? data.payload.expiry.trim() : false;
                var productId = typeof (data.payload.pid) == 'string' && data.payload.pid.trim().length > 0 ? data.payload.pid.trim().toLowerCase() : false;
                
                if (productName && productQuantity && costPrice && sellPrice && expiryDate && productId) {
                    // Look-Up Company
                    file.list('products/' + companyID, function (err, productList) {
                        if (!err && productList) {
                            // Check For Product
                            if (productList.indexOf(productName) > -1) {
                                // Fetch file
                                file.read('products/' + companyID, productName, function (err, productData) {
                                    if (!err && productData) {
                                        // Update Details
                                        productData.Product_Quantity = parseInt(productData.Product_Quantity) + parseInt(productQuantity);
                                        productData.costPrice = costPrice;
                                        productData.Sell_Price = sellPrice;
                                        productData.Expiry_Date = expiryDate;
                                        productData.Product_ID = productId;
                                        // Update file
                                        file.update('products/' + companyID, productName, productData, function (err) {
                                            if (!err) {
                                                file.update('productById/' + companyID, productId, productData, function (err) {
                                                    if (!err) {
                                                        callback(200, {
                                                            Status: 'Success',
                                                        });
                                                    } else {
                                                        callback(500, {
                                                            Error: 'Could Not Save Product File'
                                                        });
                                                    }
                                                });
                                            } else {
                                                callback(500, {
                                                    Error: 'Could Not Save Product File'
                                                });
                                            }
                                        });
                                    } else {
                                        callback(500, {
                                            Error: 'Could Not Read Product file'
                                        });
                                    }
                                })
                            } else {
                                // Define productObject
                                var productObject = {
                                    'Product_Name': productName,
                                    'Product_Quantity': productQuantity,
                                    'Cost_Price': costPrice,
                                    'Sell_Price': sellPrice,
                                    'Expiry_Date': expiryDate,
                                    'Product_ID': productId
                                };

                                // Save Product
                                file.create('products/' + companyID, productName, productObject, function (err) {
                                    if (!err) {
                                        file.create('productById/' + companyID, productId, productObject, function (err) {
                                            if (!err) {
                                                callback(200, {
                                                    Status: 'Success',
                                                });
                                            } else {
                                                callback(500, {
                                                    Error: 'Could Not Save ProductById File 2' 
                                                });
                                            }
                                        });
                                    } else {
                                        callback(500, {
                                            Error: 'Could Not Save Product File 2'
                                        });
                                    }
                                });
                            }

                        } else {
                             // Define productObject
                            var productObject = {
                                'Product_Name': productName,
                                'Product_Quantity': productQuantity,
                                'Cost_Price': costPrice,
                                'Sell_Price': sellPrice,
                                'Expiry_Date': expiryDate,
                                'Product_ID': productId
                            };

                            // Save Product
                            file.create('products/' + companyID, productName, productObject, function (err) {
                                if (!err) {
                                    file.create('productById/' + companyID, productId, productObject, function (err) {
                                        if (!err) {
                                            callback(200, {
                                                Status: 'Success',
                                            });
                                        } else {
                                            callback(500, {
                                                Error: 'Could Not Save ProductId File 1'
                                            });
                                        }
                                    });
                                } else {
                                    callback(500, {
                                        Error: 'Could Not Save Product File 1'
                                    });
                                }
                            });
                        }
                    });
                } else {
                    callback(400, {
                        Error: 'Missing Required Fields 2'
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
            Error: 'Missing Required Fields 1'
        });
    }
};

// Get method
handler.productMethods.get = function (data, callback) {
    // Define Collectables
    var companyID = typeof (data.queryStringObject.company) == 'string' && data.queryStringObject.company.trim().length > 5 ? data.queryStringObject.company.trim() : false;
    var token_ID = typeof (data.header.token) == 'string' && data.header.token.trim().length > 15 ? data.header.token.trim() : false;
    if (companyID && token_ID) {
        // Validate token
        checkToken.validateToken('tokens', token_ID, function (tokenIsValid) {
            if (tokenIsValid) {
                // Get file list
                file.list('products/' + companyID, function (err, productList) {
                    if (!err && productList) {
                        var productArray = [];
                        // Loop and read
                        for (const prop of productList) {
                            file.read('products/' + companyID, prop, function (err, productData) {
                                if (!err && productData) {
                                    productArray.push(productData);

                                    if (prop == productList[productList.length - 1]) {
                                        callback(200, productArray);
                                    }
                                } else {
                                    callback(500, {
                                        Error: 'Could not read file'
                                    });
                                }
                            });
                        }
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
        })
    } else {
        callback(400, {
            Error: 'Missing Required Fields'
        });
    }
};

// Delete Method
handler.productMethods.delete = function (data, callback) {
    // Define Collectables
    var companyID = typeof (data.queryStringObject.company) == 'string' && data.queryStringObject.company.trim().length > 5 ? data.queryStringObject.company.trim() : false;
    var productName = typeof (data.queryStringObject.name) == 'string' && data.queryStringObject.name.trim().length > 0 ? data.queryStringObject.name.trim().toLowerCase() : false;
    var token_ID = typeof (data.header.token) == 'string' && data.header.token.trim().length > 15 ? data.header.token.trim() : false;
    if (companyID && token_ID && productName) {
        // Validate token
        checkToken.validateToken('tokens', token_ID, function (tokenIsValid) {
            if (tokenIsValid) {
                // Look_Up product
                file.read('products/' + companyID, productName, function (err, productData) {
                    if (!err && productData) {
                        var productID = productData.Product_ID;
                        file.delete('productById/' + companyID, productID, function (err) {
                            if (!err) {
                                file.delete('products/' + companyID, productName, function (err) {
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
                                callback(500, {
                                    Error: 'Could Not Delete ProductID File'
                                });
                            }
                        });
                    } else {
                        callback(400, {
                            Error: 'Product Does Not Exist'
                        });
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

// Export Module
module.exports = handler;