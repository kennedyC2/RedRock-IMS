// Dependencies
// =======================================================================================
var helper = require("./helper");
var file = require("./data");
var fs = require("fs");
var path = require("path");
var payment = require("./payment");
var mail = require("./mailing");

console.log(helper.encrypt("Experioma"));

// Container for handler
// =======================================================================================
var handler = {};

// File Directory
handler.fileDir = path.join(__dirname, "/../.data/");
handler.dpDir = path.join(__dirname, "/../assets/default/");

// handler.ping
// =======================================================================================
handler.ping = function (data, callback) {
    var acceptableMethods = ["post", "get"];
    if (acceptableMethods.indexOf(data.method) > -1) {
        callback(
            200,
            {
                Server: "Up And Running",
            },
            "json"
        );
    } else {
        callback(405);
    }
};

// =========================================================================================
//                                         Users
// =========================================================================================

// handler.users
// =========================================================================================
handler.user = function (data, callback) {
    var acceptableMethods = ["post", "get", "put", "delete", "options"];
    if (acceptableMethods.indexOf(data.method) > -1) {
        if (data.method == "options") {
            callback(200, {});
        } else {
            handler.userMethods[data.method](data, callback);
        }
    } else {
        callback(405);
    }
};

// User Methods
// =========================================================================================
handler.userMethods = {};

// Post method
handler.userMethods.post = function (data, callback) {
    // Define collectables
    var companyName = typeof data.payload.companyName == "string" && data.payload.companyName.trim().length > 0 ? data.payload.companyName.trim().toLowerCase() : false;
    var firstName = typeof data.payload.firstname == "string" && data.payload.firstname.trim().length > 0 ? data.payload.firstname.trim().toLowerCase() : false;
    var lastName = typeof data.payload.lastname == "string" && data.payload.lastname.trim().length > 0 ? data.payload.lastname.trim().toLowerCase() : false;
    var email = typeof data.payload.email == "string" && data.payload.email.trim().length > 0 ? data.payload.email.trim().toLowerCase() : false;
    var phoneNo = typeof data.payload.phone == "string" && data.payload.phone.trim().length > 0 ? data.payload.phone.trim() : false;
    var password = typeof data.payload.password == "string" && data.payload.password.trim().length >= 8 ? data.payload.password.trim() : false;
    var address = typeof data.payload.address == "string" && data.payload.address.trim().length > 0 ? data.payload.address.trim().toLowerCase() : false;
    var refer = typeof data.payload.reference == "string" && data.payload.reference.trim().length > 0 ? data.payload.reference.trim() : false;
    var charge = typeof data.payload.charge == "string" && data.payload.charge.trim().length > 0 ? parseInt(data.payload.charge.trim()) : false;

    console.log(companyName, firstName, lastName, email, phoneNo, password, address, refer, charge);
    if (companyName && email && password && address && firstName && lastName && refer && charge && phoneNo) {
        // Confirm Payment
        payment.verifyPayment(refer, function (err, cardDetails) {
            if (!err && cardDetails) {
                // Look up user
                file.read("users", email, function (err) {
                    if (err) {
                        // Hash Password
                        var hashedPassword = helper.encrypt(password);
                        if (hashedPassword) {
                            // Create ID
                            var userID = helper.createID(companyName);
                            if (userID) {
                                var subscription = "";
                                var expiry = Date.now() + 1000 * 60 * 60 * 24 * 7;
                                if (charge == 7500) {
                                    subscription = "1 month";
                                }
                                if (charge == 22500) {
                                    subscription = "3 month";
                                }
                                if (charge == 75000) {
                                    subscription = "1 year";
                                }
                                console.log(subscription);
                                // Define User Object
                                var userObject = {
                                    Firstname: firstName,
                                    Lastname: lastName,
                                    Company_Name: companyName,
                                    User_ID: userID,
                                    Email: email,
                                    Phone: phoneNo,
                                    Password: hashedPassword,
                                    Address: address,
                                    Notification: "on",
                                    Profile_Pic: "profilepic.png",
                                    Threshold: "10",
                                    Last_Payment: refer,
                                    Subscription: subscription,
                                    Charge: charge,
                                    Expiry: expiry,
                                    Active: true,
                                    Card_Details: cardDetails,
                                };

                                // Create User
                                file.create("users", email, userObject, function (err) {
                                    if (!err) {
                                        // Create product folder
                                        fs.mkdir(
                                            handler.fileDir + "products" + "/" + userID,
                                            {
                                                recursive: false,
                                            },
                                            function (err) {
                                                if (!err) {
                                                    // Create Purchase file
                                                    fs.mkdir(
                                                        handler.fileDir + "purchases" + "/" + userID,
                                                        {
                                                            recursive: false,
                                                        },
                                                        function (err) {
                                                            if (!err) {
                                                                // Create Customer's file
                                                                fs.mkdir(
                                                                    handler.fileDir + "customers" + "/" + userID,
                                                                    {
                                                                        recursive: false,
                                                                    },
                                                                    function (err) {
                                                                        if (!err) {
                                                                            // Create sale's file
                                                                            fs.mkdir(
                                                                                handler.fileDir + "sales" + "/" + userID,
                                                                                {
                                                                                    recursive: false,
                                                                                },
                                                                                function (err) {
                                                                                    if (!err) {
                                                                                        // Create chart's file
                                                                                        fs.mkdir(
                                                                                            handler.fileDir + "charts" + "/" + userID,
                                                                                            {
                                                                                                recursive: false,
                                                                                            },
                                                                                            function (err) {
                                                                                                if (!err) {
                                                                                                    // Create chart's file
                                                                                                    fs.mkdir(
                                                                                                        handler.fileDir + "productById" + "/" + userID,
                                                                                                        {
                                                                                                            recursive: false,
                                                                                                        },
                                                                                                        function (err) {
                                                                                                            if (!err) {
                                                                                                                // Create chart's file
                                                                                                                fs.mkdir(
                                                                                                                    handler.fileDir + "totalSales" + "/" + userID,
                                                                                                                    {
                                                                                                                        recursive: false,
                                                                                                                    },
                                                                                                                    function (err) {
                                                                                                                        if (!err) {
                                                                                                                            // Send welcome email
                                                                                                                            var dest1 = {
                                                                                                                                email: email,
                                                                                                                                firstname: firstName,
                                                                                                                            };
                                                                                                                            mail.welcomeNote1(dest1, function (err) {
                                                                                                                                if (!err) {
                                                                                                                                    mail.welcomeNote2(dest1, function (err) {
                                                                                                                                        if (!err) {
                                                                                                                                            var dest2 = {
                                                                                                                                                firstname: firstName,
                                                                                                                                                lastname: lastName,
                                                                                                                                                company_Name: companyName,
                                                                                                                                                user_ID: userID,
                                                                                                                                                email: email,
                                                                                                                                                phone: phoneNo,
                                                                                                                                                address: address,
                                                                                                                                                subscription: subscription,
                                                                                                                                                charge: charge,
                                                                                                                                                active: true,
                                                                                                                                            };
                                                                                                                                            mail.companyNote(dest2, function (err) {
                                                                                                                                                if (!err) {
                                                                                                                                                    callback(200, {
                                                                                                                                                        Status: "Success",
                                                                                                                                                    });
                                                                                                                                                } else {
                                                                                                                                                    console.log("Error Sending mails");
                                                                                                                                                }
                                                                                                                                            });
                                                                                                                                        } else {
                                                                                                                                            console.log("Error Sending mails");
                                                                                                                                        }
                                                                                                                                    });
                                                                                                                                } else {
                                                                                                                                    console.log("Error Sending mails");
                                                                                                                                }
                                                                                                                            });
                                                                                                                        } else {
                                                                                                                            callback(400, {
                                                                                                                                Error: "Company revenue file Already Exist",
                                                                                                                            });
                                                                                                                        }
                                                                                                                    }
                                                                                                                );
                                                                                                            } else {
                                                                                                                callback(400, {
                                                                                                                    Error: "Company productById file Already Exist",
                                                                                                                });
                                                                                                            }
                                                                                                        }
                                                                                                    );
                                                                                                } else {
                                                                                                    callback(400, {
                                                                                                        Error: "Company Charts file Already Exist",
                                                                                                    });
                                                                                                }
                                                                                            }
                                                                                        );
                                                                                    } else {
                                                                                        callback(400, {
                                                                                            Error: "Company Sales file Already Exist",
                                                                                        });
                                                                                    }
                                                                                }
                                                                            );
                                                                        } else {
                                                                            callback(400, {
                                                                                Error: "Company Customer file Already Exist",
                                                                            });
                                                                        }
                                                                    }
                                                                );
                                                            } else {
                                                                callback(400, {
                                                                    Error: "Company Purchase file Already Exist",
                                                                });
                                                            }
                                                        }
                                                    );
                                                } else {
                                                    callback(400, {
                                                        Error: "Company Product file Already Exist",
                                                    });
                                                }
                                            }
                                        );
                                    } else {
                                        callback(400, {
                                            Error: "Could Not Create Account, Try Again Later",
                                        });
                                    }
                                });
                            } else {
                                console.log("Error Creating userID");
                            }
                        } else {
                            console.log("Error Hashing Password");
                        }
                    } else {
                        callback(400, {
                            Error: "User With Specified Email Already Exist",
                        });
                    }
                });
            } else {
                callback(500, {
                    Error: "Card Verification Failed, Try Again",
                });
            }
        });
    } else {
        callback(400, {
            Error: "Missing Required Fields",
        });
    }
};

// Get Method
handler.userMethods.get = function (data, callback) {
    // Define Collectables
    var email = typeof data.queryStringObject.email == "string" && data.queryStringObject.email.trim().length > 0 ? data.queryStringObject.email.trim().toLowerCase() : false;
    if (email) {
        // Get TOken
        var token = typeof data.header.token == "string" && data.header.token.trim().length > 15 ? data.header.token.trim() : false;
        if (token) {
            // Validate Token
            handler.validateToken("tokens", token, function (tokenIsValid) {
                if (tokenIsValid) {
                    // Look-Up User
                    file.read("users", email, function (err, userData) {
                        if (!err && userData) {
                            // Delete user password
                            delete userData.Password;
                            callback(200, userData);
                        } else {
                            callback(400, {
                                Error: "Specified Specified User Does Not Exist",
                            });
                        }
                    });
                } else {
                    callback(400, {
                        Error: "Expired Token Key",
                    });
                }
            });
        } else {
            callback(400, {
                Error: "Missing Token Key In Header",
            });
        }
    } else {
        callback(400, {
            Error: "Missing Required Fields",
        });
    }
};

// Put Method
handler.userMethods.put = function (data, callback) {
    // Define Collectables
    var email = typeof data.payload.email == "string" && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
    if (email) {
        // Other Collectables
        var companyName = typeof data.payload.companyName == "string" && data.payload.companyName.trim().length > 0 ? data.payload.companyName.trim().toLowerCase() : false;
        var notification = typeof data.payload.switch == "string" && data.payload.switch.trim().length > 0 ? data.payload.switch.trim().toLowerCase() : false;
        var password = typeof data.payload.password == "string" && data.payload.password.trim().length >= 8 ? data.payload.password.trim() : false;
        var firstName = typeof data.payload.firstname == "string" && data.payload.firstname.trim().length > 0 ? data.payload.firstname.trim().toLowerCase() : false;
        var lastName = typeof data.payload.lastname == "string" && data.payload.lastname.trim().length > 0 ? data.payload.lastname.trim().toLowerCase() : false;
        var address = typeof data.payload.address == "string" && data.payload.address.trim().length > 0 ? data.payload.address.trim().toLowerCase() : false;
        var threshold = typeof data.payload.limit == "string" && data.payload.limit.trim().length > 0 ? data.payload.limit.trim() : false;
        var phoneNo = typeof data.payload.phone == "number" && data.payload.phone.length > 0 ? data.payload.phone : false;
        if (companyName || notification || password || address || threshold || firstName || lastName || phoneNo) {
            // Get TOken
            var token = typeof data.header.token == "string" && data.header.token.trim().length > 15 ? data.header.token.trim() : false;
            if (token) {
                // Validate Token
                handler.validateToken("tokens", token, function (tokenIsValid) {
                    if (tokenIsValid) {
                        // Hash password
                        var hashedPassword = helper.encrypt(password);
                        // Look-Up User
                        file.read("users", email, function (err, userData) {
                            if (!err && userData) {
                                if (companyName) {
                                    userData.Company_Name = companyName;
                                }

                                if (notification) {
                                    userData.Notification = notification;
                                }

                                if (firstName) {
                                    userData.Firstname = firstName;
                                }

                                if (lastName) {
                                    userData.Lastname = lastName;
                                }

                                if (phoneNo) {
                                    userData.Phone = phoneNo;
                                }

                                if (password) {
                                    userData.Password = hashedPassword;
                                }

                                if (address) {
                                    userData.Address = address;
                                }

                                if (threshold) {
                                    userData.Threshold = threshold;
                                }

                                // Update file
                                file.update("users", email, userData, function (err) {
                                    if (!err) {
                                        callback(200, {
                                            Status: "Success",
                                        });
                                    } else {
                                        callback(500, {
                                            Error: "Could Not Update Details, Try Again later",
                                        });
                                    }
                                });
                            } else {
                                callback(400, {
                                    Error: "Specified Specified User Does Not Exist",
                                });
                            }
                        });
                    } else {
                        callback(400, {
                            Error: "Expired Token Key",
                        });
                    }
                });
            } else {
                callback(400, {
                    Error: "Missing Token Key In Header",
                });
            }
        } else {
            callback(400, {
                Error: "Missing Required Fields",
            });
        }
    } else {
        callback(400, {
            Error: "Missing Required Fields",
        });
    }
};

// Delete MEthod
handler.userMethods.delete = function (data, callback) {
    // Define Collectables
    var email = typeof data.queryStringObject.email == "string" && data.queryStringObject.email.trim().length > 0 ? data.queryStringObject.email.trim().toLowerCase() : false;
    if (email) {
        // Get TOken
        var token = typeof data.header.token == "string" && data.header.token.trim().length > 15 ? data.header.token.trim() : false;
        if (token) {
            // Validate token
            handler.validateToken("tokens", token, function (tokenIsValid) {
                if (tokenIsValid) {
                    // Look-Up User
                    file.read("users", email, function (err) {
                        if (!err) {
                            // Delete User
                            file.delete("users", email, function (err) {
                                if (!err) {
                                    callback(200, {
                                        Status: "Success",
                                    });
                                } else {
                                    callback(500, {
                                        Error: "Account Deactivation Not Successful, Try Again Later",
                                    });
                                }
                            });
                        } else {
                            callback(400, {
                                Error: "Specified User Does Not Exist",
                            });
                        }
                    });
                } else {
                    callback(400, {
                        Error: "Expired Token Key",
                    });
                }
            });
        } else {
            callback(400, {
                Error: "Missing Token Key In Header",
            });
        }
    } else {
        callback(400, {
            Error: "Missing Required Fields",
        });
    }
};

handler.picture = function (data, callback) {
    console.log("Hello");
};

// =========================================================================================
//                                         Tokens
// =========================================================================================

// handler.tokens
// =========================================================================================
handler.token = function (data, callback) {
    var acceptableMethods = ["post", "get", "put", "delete", "options"];
    if (acceptableMethods.indexOf(data.method) > -1) {
        if (data.method == "options") {
            callback(200, {});
        } else {
            handler.tokenMethods[data.method](data, callback);
        }
    } else {
        callback(405, {});
    }
};

// Token Methods
// ==========================================================================================
handler.tokenMethods = {};

// Post Method
handler.tokenMethods.post = function (data, callback) {
    // Define Collectables
    var email = typeof data.payload.email == "string" && data.payload.email.trim().length > 0 ? data.payload.email.trim().toLowerCase() : false;
    var password = typeof data.payload.password == "string" && data.payload.password.trim().length >= 8 ? data.payload.password.trim() : false;
    if (email && password) {
        // look-Up User
        file.read("users", email, function (err, userData) {
            if (!err && userData) {
                // Confirm Password
                var hashedPassword = helper.encrypt(password);
                if (hashedPassword == userData.Password) {
                    var userId = userData.User_ID;
                    var threshold = userData.Threshold;
                    var tokenId = helper.createRandomString(30);
                    var expires = Date.now() + 1000 * 60 * 30;
                    // Define Token Object
                    var tokenObject = {
                        Email: email,
                        User_ID: userId,
                        Token_ID: tokenId,
                        Threshold: threshold,
                        Expires: expires,
                    };

                    // Create Token
                    file.create("tokens", tokenId, tokenObject, function (err, tokenObject) {
                        if (!err && tokenObject) {
                            callback(200, {
                                Status: "Login Successful",
                                Token: tokenId,
                            });
                        } else {
                            callback(500, {
                                Error: "Login Not Successful, Try Again Later",
                            });
                        }
                    });
                } else {
                    callback(400, {
                        Error: "Wrong Password, Try Again",
                    });
                }
            } else {
                callback(400, {
                    Error: "Specified User Does Not Exist",
                });
            }
        });
    } else {
        callback(400, {
            Error: "Missing Required Fields",
        });
    }
};

// Get Method
handler.tokenMethods.get = function (data, callback) {
    // Define Collectables
    var token = typeof data.header.token == "string" && data.header.token.trim().length > 15 ? data.header.token.trim() : false;
    if (token) {
        // look-Up token
        file.read("tokens", token, function (err, tokenData) {
            if (!err && tokenData) {
                // Validate Token
                handler.validateToken("tokens", token, function (tokenIsValid) {
                    if (tokenIsValid) {
                        callback(200, tokenData);
                    } else {
                        callback(400, {
                            Error: "Expired Token Key",
                        });
                    }
                });
            } else {
                callback(404, {
                    Error: "Token Key Does Not Exist",
                });
            }
        });
    } else {
        callback(400, {
            Error: "Missing Token Key In Header",
        });
    }
};

// Put Method
handler.tokenMethods.put = function (data, callback) {
    // Define Collectables
    var token = typeof data.header.token == "string" && data.header.token.trim().length > 15 ? data.header.token.trim() : false;
    var extend = typeof data.queryStringObject.extend == "string" && data.queryStringObject.extend.trim() == "true" ? true : false;
    if (token && extend) {
        // Look-Up token
        file.read("tokens", token, function (err, tokenData) {
            if (!err && tokenData) {
                if (tokenData.Expires > Date.now()) {
                    // Extend token by 30mins
                    tokenData.Expires = Date.now() + 1000 * 60 * 30;
                    // Update TOken
                    file.update("tokens", token, tokenData, function (err) {
                        if (!err) {
                            callback(200, {
                                Status: "Success",
                            });
                        } else {
                            callback(500, {
                                Error: "Could Update Token Data",
                            });
                        }
                    });
                } else {
                    callback(400, {
                        Error: "Expired Token Key",
                    });
                }
            } else {
                callback(404, {
                    Error: "Token Key Does Not Exist",
                });
            }
        });
    } else {
        callback(400, {
            Error: "Missing Token Key In Header",
        });
    }
};

// Delete Method
handler.tokenMethods.delete = function (data, callback) {
    // Define Collectables
    var token = typeof data.header.token == "string" && data.header.token.trim().length > 15 ? data.header.token.trim() : false;
    if (token) {
        // Look-up token
        file.read("tokens", token, function (err) {
            if (!err) {
                // Delete Token
                file.delete("tokens", token, function (err) {
                    if (!err) {
                        callback(200, {
                            Status: "Success",
                        });
                    } else {
                        callback(500, {
                            Error: "Could Not Delete Token",
                        });
                    }
                });
            } else {
                callback(404, {
                    Error: "Token Key Does Not Exist",
                });
            }
        });
    } else {
        callback(400, {
            Error: "Missing Token Ken In Header",
        });
    }
};

// Function For Validating token Ids
handler.validateToken = function (folder, filename, callback) {
    file.read(folder, filename, function (err, tokenData) {
        if (!err && tokenData.Expires > Date.now()) {
            callback(true);
        } else {
            callback(false);
        }
    });
};

// Export Module
// ========================================================================================
module.exports = handler;
