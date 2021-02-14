// Dependencies
// =======================================================================================
var file = require('./data');
var fs = require('fs');
var path = require('path');
var checkToken = require('./handler');

// Container for handler
// =======================================================================================
var handler = {};

// File Directory
handler.fileDir = path.join(__dirname, '/../.data/');

// =========================================================================================
//                                         Sales
// =========================================================================================

// handler.sales
// =========================================================================================
handler.sales = function (data, callback) {
    var acceptableMethods = ['post', 'get', 'options'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        if (data.method == 'options') {
            callback(200, {});
        } else {
            handler.saleMethods[data.method](data, callback);
        }
    } else {
        callback(405);
    }
};

// Product Methods
// ==========================================================================================
handler.saleMethods = {};

// Post Method
handler.saleMethods.post = function (data, callback) {
    // Define Collectables
    var companyID = typeof (data.payload.company) == 'string' && data.payload.company.toString().trim().length > 5 ? data.payload.company.toString().trim() : false;
    var token_ID = typeof (data.header.token) == 'string' && data.header.token.trim().length > 15 ? data.header.token.trim() : false;
    console.log(companyID, token_ID)
    if (companyID && token_ID) {
        // Validate token
        checkToken.validateToken('tokens', token_ID, function (tokenIsValid) {
            if (tokenIsValid) {
                // Other Collectables
                var customerName = typeof (data.payload.name) == 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
                var purchaseQuantity = typeof (data.payload.quantity) == 'string' && data.payload.quantity.trim().length > 0 ? data.payload.quantity.trim() : false;
                var email = typeof (data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
                var phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length > 0 ? data.payload.phone.trim() : false;
                var productId = typeof (data.payload.pid) == 'string' && data.payload.pid.trim().length > 0 ? data.payload.pid.trim() : false;
                var productName = typeof (data.payload.pname) == 'string' && data.payload.pname.trim().length > 0 ? data.payload.pname.trim() : false;
                var time = typeof (data.payload.time) == 'string' && data.payload.time.trim().length > 0 ? data.payload.time.trim() : false;
                var month = typeof (data.payload.month) == 'string' && data.payload.month.trim().length > 0 ? data.payload.month.trim() : false;
                var year = typeof (data.payload.year) == 'number' && data.payload.year.toString().trim().length > 0 ? data.payload.year.toString().trim() : false;
                console.log(customerName, purchaseQuantity, email, phone, productId, productName, time, month, year)
                if (customerName && purchaseQuantity && email && phone && productId && productName && time && month && year) {
                    // Read file
                    file.read('products/' + companyID, productName, function (err, productData) {
                        // Sanity check
                        if (!err && productData) {
                            // Read sales folder
                            file.read('sales/' + companyID + '/' + year, month, function (err, salesData) {
                                if (!err && salesData) {
                                    //  Define sales Object
                                    var saleNow = (productData.Sell_Price * purchaseQuantity) - (productData.Cost_Price * purchaseQuantity);
                                    salesData.Sale += saleNow;

                                    // Update file
                                    file.update('sales/' + companyID + '/' + year, month, salesData, function (err) {
                                        if (!err) {
                                            callback(200, {
                                                Status: 'Success',
                                            });
                                        } else {
                                            callback(500, {
                                                Error: 'Could Not Save Sales File'
                                            });
                                        }
                                    });
                                } else {
                                    // Create year directory
                                    fs.mkdir(handler.fileDir + 'sales' + '/' + companyID + '/' + year, {
                                        recursive: false
                                    }, function (err) {
                                        if (!err) {
                                            //  Define sales Object
                                            var saleNow = (productData.Sell_Price * purchaseQuantity) - (productData.Cost_Price * purchaseQuantity);
                                            var salesObject = {
                                                'Month': month,
                                                'Sale': saleNow
                                            }

                                            // Save file
                                            file.create('sales/' + companyID + '/' + year, month, salesObject, function (err) {
                                                if (!err) {
                                                    callback(200, {
                                                        Status: 'Success',
                                                    });
                                                } else {
                                                    callback(500, {
                                                        Error: 'Could Not Save Sales File'
                                                    });
                                                }
                                            });
                                        } else {
                                            //  Define sales Object
                                            var saleNow = (productData.Sell_Price * purchaseQuantity) - (productData.Cost_Price * purchaseQuantity);
                                            var salesObject = {
                                                'Month': month,
                                                'Sale': saleNow
                                            }

                                            // Save file
                                            file.create('sales/' + companyID + '/' + year, month, salesObject, function (err) {
                                                if (!err) {
                                                    callback(200, {
                                                        Status: 'Success',
                                                    });
                                                } else {
                                                    callback(500, {
                                                        Error: 'Could Not Save Sales File'
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            callback(500, {
                                Error: 'Could Not Read Product file'
                            });
                        }
                    });
                }
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

// Get method
handler.saleMethods.get = function (data, callback) {
    // Define Collectables
    var companyID = typeof (data.queryStringObject.company) == 'string' && data.queryStringObject.company.trim().length > 5 ? data.queryStringObject.company.trim() : false;
    var token_ID = typeof (data.header.token) == 'string' && data.header.token.trim().length > 15 ? data.header.token.trim() : false;
    var month = typeof (data.queryStringObject.month) == 'string' && data.queryStringObject.month.trim().length > 0 ? data.queryStringObject.month.trim() : false;
    var year = typeof (data.queryStringObject.year) == 'string' && data.queryStringObject.year.trim().length > 0 ? data.queryStringObject.year.trim() : false;
    if (companyID && token_ID && month && year) {
        // Validate token
        checkToken.validateToken('tokens', token_ID, function (tokenIsValid) {
            if (tokenIsValid) {
                file.read('sales/' + companyID + '/' + year, month, function (err, salesData) {
                    if (!err && salesData) {
                        callback(200, salesData);
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

// =========================================================================================
//                                         ProductById
// =========================================================================================

// handler.productById
// =========================================================================================
handler.productById = function (data, callback) {
    var acceptableMethods = ['get', 'options'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        if (data.method == 'options') {
            callback(200, {});
        } else {
            handler.productByIdMethods[data.method](data, callback);
        }
    } else {
        callback(405);
    }
};

// ProductById Methods
// ==========================================================================================
handler.productByIdMethods = {};

// Get Method
handler.productByIdMethods.get = function (data, callback) {
    // Define Collectables
    var companyID = typeof (data.queryStringObject.company) == 'string' && data.queryStringObject.company.trim().length > 5 ? data.queryStringObject.company.trim() : false;
    var token_ID = typeof (data.header.token) == 'string' && data.header.token.trim().length > 15 ? data.header.token.trim() : false;
    var product_ID = typeof (data.queryStringObject.productId) == 'string' && data.queryStringObject.productId.trim().length > 0 ? data.queryStringObject.productId.trim().toLowerCase() : false;
    if (companyID && token_ID && product_ID) {
        // Validate token
        checkToken.validateToken('tokens', token_ID, function (tokenIsValid) {
            if (tokenIsValid) {
                file.read('productById/' + companyID, product_ID, function (err, productData) {
                    if (!err && productData) {
                        callback(200, productData);
                    } else {
                        callback(200, {
                            Error: 'Specified Product Does Not Exist'
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
}


// =========================================================================================
//                                         Charts
// =========================================================================================

// handler.charts
// =========================================================================================
handler.charts = function (data, callback) {
    var acceptableMethods = ['post', 'get', 'options'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        if (data.method == 'options') {
            callback(200, {});
        } else {
            handler.chartMethods[data.method](data, callback);
        }
    } else {
        callback(405);
    }
};

// Chart Methods
// ==========================================================================================
handler.chartMethods = {};

// Post Method
handler.chartMethods.post = function (data, callback) {
    // Define Collectables
    var companyID = typeof (data.payload.company) == 'string' && data.payload.company.toString().trim().length > 5 ? data.payload.company.toString().trim() : false;
    var token_ID = typeof (data.header.token) == 'string' && data.header.token.trim().length > 15 ? data.header.token.trim() : false;
    if (companyID && token_ID) {
        // Validate token
        checkToken.validateToken('tokens', token_ID, function (tokenIsValid) {
            if (tokenIsValid) {
                // Other Collectables
                var customerName = typeof (data.payload.name) == 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
                var purchaseQuantity = typeof (data.payload.quantity) == 'string' && data.payload.quantity.trim().length > 0 ? data.payload.quantity.trim() : false;
                var email = typeof (data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
                var phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length > 0 ? data.payload.phone.trim() : false;
                var productId = typeof (data.payload.pid) == 'string' && data.payload.pid.trim().length > 0 ? data.payload.pid.trim() : false;
                var productName = typeof (data.payload.pname) == 'string' && data.payload.pname.trim().length > 0 ? data.payload.pname.trim() : false;
                var time = typeof (data.payload.time) == 'string' && data.payload.time.trim().length > 0 ? data.payload.time.trim() : false;
                var month = typeof (data.payload.month) == 'string' && data.payload.month.trim().length > 0 ? data.payload.month.trim() : false;
                var year = typeof (data.payload.year) == 'number' && data.payload.year.toString().trim().length > 0 ? data.payload.year.toString().trim() : false;
                var day = typeof (data.payload.day) == 'number' && data.payload.day.toString().trim().length > 0 ? data.payload.day : false;
                if (customerName && purchaseQuantity && email && phone && productId && productName && time && month && year) {
                    // Read file
                    file.read('products/' + companyID, productName, function (err, productData) {
                        // Sanity check
                        if (!err && productData) {
                            // Read sales folder
                            file.read('charts/' + companyID + '/' + year, month, function (err, chartData) {
                                if (!err && chartData) {
                                    //  Define sales Object
                                    var saleNow = (productData.Sell_Price * purchaseQuantity) - (productData.Cost_Price * purchaseQuantity);
                                    chartData.Array[day - 1] += saleNow;

                                    // Update file
                                    file.update('charts/' + companyID + '/' + year, month, chartData, function (err) {
                                        if (!err) {
                                            callback(200, {
                                                Status: 'Success',
                                            });
                                        } else {
                                            callback(500, {
                                                Error: 'Could Not Save Sales File'
                                            });
                                        }
                                    });
                                } else {
                                    // Create year directory
                                    fs.mkdir(handler.fileDir + 'charts' + '/' + companyID + '/' + year, {
                                        recursive: false
                                    }, function (err) {
                                        if (!err) {
                                            //  Define sales Object
                                            var saleThisMonth = '';
                                            if (month == 'Sep' || month == 'Apr' || month == 'Jun' || month == 'Nov') {
                                                saleThisMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                            }

                                            if (month == 'Feb' && year % 4 == 0) {
                                                saleThisMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                            }

                                            if (month == 'Feb' && year % 4 !== 0) {
                                                saleThisMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                            }

                                            if (month == 'Jan' || month == 'Mar' || month == 'May' || month == 'Jul' || month == 'Aug' || month == 'Oct' || month == 'Dec') {
                                                saleThisMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                            }

                                            // Update position
                                            var saleNow = (productData.Sell_Price * purchaseQuantity) - (productData.Cost_Price * purchaseQuantity);
                                            saleThisMonth[day - 1] = saleNow;
                                            var chartObject = {
                                                'Array': saleThisMonth
                                            }

                                            // Save file
                                            file.create('charts/' + companyID + '/' + year, month, chartObject, function (err) {
                                                if (!err) {
                                                    callback(200, {
                                                        Status: 'Success',
                                                    });
                                                } else {
                                                    callback(500, {
                                                        Error: 'Could Not Save Sales File'
                                                    });
                                                }
                                            });
                                        } else {
                                            //  Define sales Object
                                            var saleThisMonth = '';
                                            if (month == 'Sep' || month == 'Apr' || month == 'Jun' || month == 'Nov') {
                                                saleThisMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                            }

                                            if (month == 'Feb' && year % 4 == 0) {
                                                saleThisMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                            }

                                            if (month == 'Feb' && year % 4 !== 0) {
                                                saleThisMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                            }

                                            if (month == 'Jan' || month == 'Mar' || month == 'May' || month == 'Jul' || month == 'Aug' || month == 'Oct' || month == 'Dec') {
                                                saleThisMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                            }

                                            // Update position
                                            var saleNow = (productData.Sell_Price * purchaseQuantity) - (productData.Cost_Price * purchaseQuantity);
                                            saleThisMonth[day - 1] = saleNow;
                                            var chartObject = {
                                                'Array': saleThisMonth
                                            }

                                            // Save file
                                            file.create('charts/' + companyID + '/' + year, month, chartObject, function (err) {
                                                if (!err) {
                                                    callback(200, {
                                                        Status: 'Success',
                                                    });
                                                } else {
                                                    callback(500, {
                                                        Error: 'Could Not Save Sales File'
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            callback(500, {
                                Error: 'Could Not Read Product file'
                            });
                        }
                    });
                }
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

// Get method
handler.chartMethods.get = function (data, callback) {
    // Define Collectables
    var companyID = typeof (data.queryStringObject.company) == 'string' && data.queryStringObject.company.trim().length > 5 ? data.queryStringObject.company.trim() : false;
    var token_ID = typeof (data.header.token) == 'string' && data.header.token.trim().length > 15 ? data.header.token.trim() : false;
    var month = typeof (data.queryStringObject.month) == 'string' && data.queryStringObject.month.trim().length > 0 ? data.queryStringObject.month.trim() : false;
    var year = typeof (data.queryStringObject.year) == 'string' && data.queryStringObject.year.trim().length > 0 ? data.queryStringObject.year.trim() : false;
    if (companyID && token_ID && month && year) {
        // Validate token
        checkToken.validateToken('tokens', token_ID, function (tokenIsValid) {
            if (tokenIsValid) {
                file.read('charts/' + companyID + '/' + year, month, function (err, chartData) {
                    if (!err && chartData) {
                        callback(200, chartData);
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


// =========================================================================================
//                                         totalSales
// =========================================================================================

// handler.sales
// =========================================================================================
handler.totalSales = function (data, callback) {
    var acceptableMethods = ['post', 'get', 'options'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        if (data.method == 'options') {
            callback(200, {});
        } else {
            handler.totalSalesMethods[data.method](data, callback);
        }
    } else {
        callback(405);
    }
};

// Product Methods
// ==========================================================================================
handler.totalSalesMethods = {};

// Post Method
handler.totalSalesMethods.post = function (data, callback) {
    // Define Collectables
    var companyID = typeof (data.payload.company) == 'string' && data.payload.company.toString().trim().length > 5 ? data.payload.company.toString().trim() : false;
    var token_ID = typeof (data.header.token) == 'string' && data.header.token.trim().length > 15 ? data.header.token.trim() : false;
    if (companyID && token_ID) {
        // Validate token
        checkToken.validateToken('tokens', token_ID, function (tokenIsValid) {
            if (tokenIsValid) {
                // Other Collectables
                var customerName = typeof (data.payload.name) == 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
                var purchaseQuantity = typeof (data.payload.quantity) == 'string' && data.payload.quantity.trim().length > 0 ? data.payload.quantity.trim() : false;
                var email = typeof (data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
                var phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length > 0 ? data.payload.phone.trim() : false;
                var productId = typeof (data.payload.pid) == 'string' && data.payload.pid.trim().length > 0 ? data.payload.pid.trim() : false;
                var productName = typeof (data.payload.pname) == 'string' && data.payload.pname.trim().length > 0 ? data.payload.pname.trim() : false;
                var time = typeof (data.payload.time) == 'string' && data.payload.time.trim().length > 0 ? data.payload.time.trim() : false;
                var month = typeof (data.payload.month) == 'string' && data.payload.month.trim().length > 0 ? data.payload.month.trim() : false;
                var year = typeof (data.payload.year) == 'number' && data.payload.year.toString().trim().length > 0 ? data.payload.year.toString().trim() : false;
                if (customerName && purchaseQuantity && email && phone && productId && productName && time && month && year) {
                    // Read file
                    file.read('products/' + companyID, productName, function (err, productData) {
                        // Sanity check
                        if (!err && productData) {
                            // Read sales folder
                            file.read('totalSales/' + companyID + '/' + year, month, function (err, totalSalesData) {
                                if (!err && totalSalesData) {
                                    //  Define sales Object
                                    var saleNow = productData.Sell_Price * purchaseQuantity;
                                    totalSalesData.Sale += saleNow;

                                    // Update file
                                    file.update('totalSales/' + companyID + '/' + year, month, totalSalesData, function (err) {
                                        if (!err) {
                                            callback(200, {
                                                Status: 'Success',
                                            });
                                        } else {
                                            callback(500, {
                                                Error: 'Could Not Save TotalSales File'
                                            });
                                        }
                                    });
                                } else {
                                    // Create year directory
                                    fs.mkdir(handler.fileDir + 'totalSales' + '/' + companyID + '/' + year, {
                                        recursive: false
                                    }, function (err) {
                                        if (!err) {
                                            //  Define sales Object
                                            var saleNow = productData.Sell_Price * purchaseQuantity;
                                            var salesObject = {
                                                'Month': month,
                                                'Sale': saleNow
                                            }

                                            // Save file
                                            file.create('totalSales/' + companyID + '/' + year, month, salesObject, function (err) {
                                                if (!err) {
                                                    callback(200, {
                                                        Status: 'Success',
                                                    });
                                                } else {
                                                    callback(500, {
                                                        Error: 'Could Not Save TotalSales File'
                                                    });
                                                }
                                            });
                                        } else {
                                            //  Define sales Object
                                            var saleNow = productData.Sell_Price * purchaseQuantity;
                                            var salesObject = {
                                                'Month': month,
                                                'Sale': saleNow
                                            }

                                            // Save file
                                            file.create('totalSales/' + companyID + '/' + year, month, salesObject, function (err) {
                                                if (!err) {
                                                    callback(200, {
                                                        Status: 'Success',
                                                    });
                                                } else {
                                                    callback(500, {
                                                        Error: 'Could Not Save TotalSales File'
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            callback(500, {
                                Error: 'Could Not Read Product file'
                            });
                        }
                    });
                }
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

// Get method
handler.totalSalesMethods.get = function (data, callback) {
    // Define Collectables
    var companyID = typeof (data.queryStringObject.company) == 'string' && data.queryStringObject.company.trim().length > 5 ? data.queryStringObject.company.trim() : false;
    var token_ID = typeof (data.header.token) == 'string' && data.header.token.trim().length > 15 ? data.header.token.trim() : false;
    var month = typeof (data.queryStringObject.month) == 'string' && data.queryStringObject.month.trim().length > 0 ? data.queryStringObject.month.trim() : false;
    var year = typeof (data.queryStringObject.year) == 'string' && data.queryStringObject.year.trim().length > 0 ? data.queryStringObject.year.trim() : false;
    if (companyID && token_ID && month && year) {
        // Validate token
        checkToken.validateToken('tokens', token_ID, function (tokenIsValid) {
            if (tokenIsValid) {
                file.read('totalSales/' + companyID + '/' + year, month, function (err, totalSalesData) {
                    if (!err && totalSalesData) {
                        callback(200, totalSalesData);
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



// Export module
// ===========================================================================================
module.exports = handler;