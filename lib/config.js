// Container for all environment
var environment = {};

// Staging environment
environment.staging = {
    'httpPort': 5000,
    'httpsPort': 5050,
    'envName': 'staging',
    'littleSecret': 'KennedyCyoung48',
    'globalTemplates': {
        'baseUrl' : 'http://localhost:5000',
        'companyName' : 'RedRock Inventory System',
        'company': 'RedRock Technologies Ltd',
        'yearCreated' : 2020
    },
    'testKey': 'sk_test_4bb572243cfe0c1e125e4f8ed4b567441dd62aac'
}

// Production environment
environment.production = {
    'httpPort': 5000,
    'httpsPort': 5050,
    'envName': 'production',
    'littleSecret': 'KennedyCyoung48',
    'globalTemplates': {
        'baseUrl' : 'http://localhost:5000',
        'companyName' : 'RedRock Inventory System',
        'company': 'RedRock Technologies Ltd',
        'yearCreated' : 2020
    }
}

// Determine which environment was passed as a command-line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not default to staging
var environmentToExport = typeof(environment[currentEnvironment]) == 'object' ? environment[currentEnvironment] : environment.staging;

// Export the module
module.exports = environmentToExport;