// Dependencies
// =====================================================================================
var fs = require('fs');
var template = require('./template');
var path = require('path');



//  Define renders
//  ====================================================================================
var render = {};

// =====================================================================================
//                                   Page Render
// =====================================================================================
// render not found
render.notFound = function (data, callback) {
    callback(404, '<h1 style="color: red; margin: auto;">404: NOT FOUND</h2>', 'html');
}

// render.index
render.index = function (data, callback) {
    if (data.method == 'get') {
        extraTemplate = {
            'body.class': 'entry',
            'body.description': 'RedRock Inventory System',
            'body.js': 'src = "assets/js/entry.js"',
            'payStack.js': 'src="https://js.paystack.co/v1/inline.js"'
        }

        // Get templates
        template.getTemplates('index', extraTemplate, function (err, templateData) {
            if (!err && templateData) {
                // GEt full templates
                template.getFullTemplates(templateData, extraTemplate, function(err, fullTemplate) {
                    if (!err && fullTemplate) {
                        callback(200, fullTemplate, 'html')
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html');
    }
};

// render.app
// ===================================================================================================
render.app = function (data, callback) {
    if (data.method == 'get') {
        extraTemplate = {
            'body.dp1': 'style = "background-image: url(assets/default/profilepic.png);"',
            'body.dp2': 'style = "background-image: url(assets/default/profilepic.png);"',
            'body.dp3': 'style = "background-image: url(assets/default/profilepic.png);"',
            'body.class': 'ims',
            'body.description': 'RedRock Inventory System',
            'body.js': 'src = "assets/js/app.js"',
            'payStack.js': 'src="https://js.paystack.co/v1/inline.js"'
        }

        // Get templates
        template.getTemplates('app', extraTemplate, function (err, templateData) {
            if (!err && templateData) {
                // GEt full templates
                template.getFullTemplates(templateData, extraTemplate, function(err, fullTemplate) {
                    if (!err && fullTemplate) {
                        callback(200, fullTemplate, 'html')
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html');
    }
};

// render.public
// =================================================================================================
render.assets = function (data, callback) {
    if (data.method == 'get') {
        // Get the filename requested
        var trimmedAssetName = data.trimmedPath.replace('assets/', '').trim();
        if (trimmedAssetName && trimmedAssetName.length > 0) {
            // Get the asset data
            template.getStaticData(trimmedAssetName, function (err, file) {
                if (!err && file) {
                    // Determine teh content type (default to plain)
                    var contentType = 'plain';

                    // css
                    if (trimmedAssetName.indexOf('.css') > -1) {
                        contentType = 'css';
                    }

                    // JS
                    if (trimmedAssetName.indexOf('.js') > -1) {
                        contentType = 'plain';
                    }

                    // svg
                    if (trimmedAssetName.indexOf('.svg') > -1) {
                        contentType = 'svg';
                    }

                    // png
                    if (trimmedAssetName.indexOf('.png') > -1) {
                        contentType = 'png';
                    }

                    // jpg
                    if (trimmedAssetName.indexOf('.jpg') > -1) {
                        contentType = 'jpg';
                    }

                    // callback the data
                    callback(200, file, contentType);
                } else {
                    callback(404);
                }
            });
        } else {
            callback(404);
        }
    } else {
        callback(405);
    }
};

render.favicon = function (data, callback) {
    if (data.method == 'get') {
        favDir = path.join(__dirname, '../assets/favicon_io/');
        // Get file
        fs.readFile(favDir + 'favicon.ico', function (err, file) {
            if (!err && file) {
                callback(200, file, 'ico');
            } else {
                callback(404)
            }
        });
    } else {
        callback(405)
    }
};

// Export module
// =====================================================================================
module.exports = render;