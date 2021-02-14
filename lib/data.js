// Dependencies
// ==================================================================================
var fs = require('fs');
var path = require('path');
var helper = require('./helper');

// Container for file functions
// ==================================================================================
var file = {};

// Base directory
// ==================================================================================
file.baseDir = path.join(__dirname, '/../.data/');

// Create file function
// ==================================================================================
file.create = function (folder, filename, data, callback) {
    // Open folder
    fs.open(file.baseDir + folder + '/' + filename + '.json', 'wx', function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            // Stringify data to be saved
            var dataStr = JSON.stringify(data);
            // Write data into file
            fs.write(fileDescriptor, dataStr, function (err) {
                if (!err) {
                    // Close the file
                    fs.close(fileDescriptor, function (err) {
                        if (!err) {
                            callback(false, dataStr);
                        } else {
                            callback('Could not close file');
                        }
                    });
                } else {
                    callback('Could not write data into file');
                }
            });
        } else {
            callback('Could not create file, file may already exist');
        }
    });
};

// Read file
// =====================================================================================
file.read = function (folder, filename, callback) {
    // Open file
    fs.readFile(file.baseDir + folder + '/' + filename + '.json', 'utf-8', function (err, data) {
        if (!err && data) {
            // Parse file
            var dataR = JSON.parse(data);
            callback(false, dataR);
        } else {
            console.log(err)
            callback(err);
        }
    });
};


// Edit or Update file
// =====================================================================================
file.update = function (folder, filename, data, callback) {
    // Open file
    fs.open(file.baseDir + folder + '/' + filename + '.json', 'r+', function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            // Truncate file
            fs.truncate(file.baseDir + folder + '/' + filename + '.json', function (err) {
                if (!err) {
                    // // Stringify data
                    var dataStr = JSON.stringify(data);
                    // Update file
                    fs.writeFile(fileDescriptor, dataStr, function(err) {
                        if (!err) {
                            // Close file
                            fs.close(fileDescriptor, function (err) {
                                if (!err) {
                                    callback(false, data);
                                } else {
                                    callback('Could not close file');
                                }
                            });
                        } else {
                            callback('Could not write file');
                        }
                    });
                } else {
                    callback('Could not truncate file');
                }
            });
        } else {
            callback('Could not open file');
        }
    });
};

// List file
// ========================================================================================
file.list = function (folder, callback) {
    // Read directory
    fs.readdir(file.baseDir + folder, function (err, files) {
        if (!err && files && files.length > 0) {
            // trim files
            var trimmedFiles = [];
            files.forEach((each) => {
                trimmedFiles.push(each.replace('.json', ''));
            });
            callback(false, trimmedFiles)
        } else {
            callback(true);
        }
    });
};

// Delete file
// =======================================================================================
file.delete = function (folder, filename, callback) {
    // open folder ton delete file
    fs.unlink(file.baseDir + folder + '/' + filename + '.json', function (err) {
        if (!err) {
            callback(false);
        } else {
            callback('Could Not Delete File');
        }
    });
};

// Export module
// =====================================================================================
module.exports = file;