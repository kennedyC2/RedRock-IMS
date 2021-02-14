// Dependencies
// ======================================================================================
var fs = require('fs');
var config = require('./config');
var path = require('path');


// Container
var render = {};

// file path
render.templateDir = path.join(__dirname, '../templates/');
render.assetDir = path.join(__dirname, '../assets/');


// Functions for fetching and organizing templates
// ======================================================================================= 

// Get templates
render.getTemplates = function (templateName, data, callback) {
    // sanity check
    template = typeof (templateName) == 'string' && templateName.length > 0 ? templateName : false;
    data = typeof (data) == 'object' && data !== null ? data : {};
    if (template) {
        // read dir to fetch templates 
        fs.readFile(render.templateDir + template + '.html', 'utf-8', function (err, str) {
            if (!err && str.length > 0) {
                finalTemplate = render.interpolate(str, data);
                callback(false, finalTemplate);
            } else {
                callback('No templates could be found');
            }
        });
    } else {
        callback('Specified template is not valid');
    }
};

// find and replace global values
render.interpolate = function (str, data) {
    // sanity check
    str = typeof (str) == 'string' && str.length > 0 ? str : '';
    data = typeof (data) == 'object' && data !== null ? data : {};

    // add the global templates to the data object
    for (const d in config.globalTemplates) {
        if (config.globalTemplates.hasOwnProperty(d)) {
            data['global.' + d] = config.globalTemplates[d];
        }
    }

    //  Insert New Values
    for (const e in data) {
        if (data.hasOwnProperty(e)) {
            var newDeal = data[e];
            var old = '{' + e + '}';
            str = str.replace(old, newDeal);
        }
    }
    return str;
};

// Get Full Templates
render.getFullTemplates = function (str, data, callback) {
    // sanity check
    str = typeof (str) == 'string' && str.length > 0 ? str : '';
    data = typeof (data) == 'object' && data !== null ? data : {};

    // Get Header template
    render.getTemplates('header', data, function (err, header) {
        if (!err && header) {
            // Get footer template
            render.getTemplates('footer', data, function (err, footer) {
                if (!err && footer) {
                    // Concatenate all the string
                    fullTemplate = header + str + footer;
                    callback(false, fullTemplate);
                } else {
                    callback('Could not find footer template');
                }
            });
        } else {
            callback('Could not find header template');
        }
    });
};

// Get Static Data
render.getStaticData = function (link, callback) {
    // sanity check
    var staticData = typeof (link) == 'string' && link.length > 0 ? link : false;
    if (staticData) {
        fs.readFile(render.assetDir + link, function (err, file) {
            if (!err && file) {
                callback(false, file);
            } else {
                callback('file not found');
            }
        });
    } else {
        callback('A valid name was not specified');
    }
};

// Export module
// ==============================================================================================
module.exports = render;