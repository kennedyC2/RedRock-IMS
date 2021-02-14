// Dependencies 
// ==============================================================================
var hash = require('crypto');
var config = require('./config');

// Container for helpers
// =============================================================================
var helper = {};

// Parse JSON to object
helper.parseObject = function (data) {
    // if (data == '') {
    //     return data;
    // } else {
        try {
            var obj = JSON.parse(data);
            return obj;
        } catch(e) {
            return e;
        }
    // }
};

// Hash password
helper.encrypt = function (input) {
    if(typeof(input) == 'string' && input.length >= 8) {
        newPassword = hash.createHash('sha256', config.littleSecret).update(input).digest('hex');
        return newPassword;
    } else {
        return false;
    }
};

// Generate Random Strings
helper.createRandomString = function (strLen) {
    strLen = typeof(strLen) == 'number' && strLen >= 20 ? strLen : false;
    if (strLen) {
        // Define possible characters
        var possibleCharacters = 'abcdefghijklmnopqrstuvwsyz1234567890';
        // Generation process
        var finale = '';
        for (i = 1 ; i < strLen ; i += 1) {
            // Get a random character from possibleCharacters
            var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
            // join this item to string
            finale += randomCharacter;
        }
        return finale;
    } else {
        return false;
    }
};

// Create ID
helper.createID = function (Uname) {
    var companyName = Uname;
    var firstLetter = companyName[0].toUpperCase();
    var timeOfReg = Date.now();
    var userName = firstLetter + timeOfReg
    return userName;
}


// Export helper
// ==============================================================================
module.exports = helper;