// Dependencies
var file = require("./data");

// Container for handler
// =========================================================================================
var handler = {};

// =========================================================================================
handler.cleanTokenFolder = function () {
    // Get tokens
    file.list("tokens", function (err, tokenList) {
        if (!err && tokenList) {
            // Read files
            for (const prop of tokenList) {
                file.read("tokens", prop, function (err, tokenData) {
                    if (!err && tokenData) {
                        if (tokenData.Expires < Date.now()) {
                            file.delete("tokens", prop, function (err) {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        }
                    } else {
                        console.log(err);
                    }
                });
            }
        } else {
            console.log(err);
        }
    });
};

// handler.cleanTokenFolder();

// Export module
module.exports = handler;
