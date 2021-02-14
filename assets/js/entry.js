// ==================================================================================
//                             PAGE Functions
// ==================================================================================

// Login and SignUp Page
var nPane = document.getElementById('nPane');
var animateN = document.getElementById('animateN');
var loginSwitch = document.getElementById('login');
var signUpSwitch = document.getElementById('signUp');
var agreeSwitch = document.getElementById('nextP');
var signUpPage = document.getElementById('signUpPage');
var loginPage = document.getElementById('loginPage');
var loginCall = document.getElementById('stLogin');
var agreement = document.getElementById('agreePage');
var loginBox = document.getElementById('lGn');
var infoBox = document.getElementById('info');
var trigger = document.getElementById('trigger');
var pay = document.getElementById('pay');
var fmList = [loginSwitch, signUpSwitch, agreeSwitch];

for (const prop of fmList) {
    prop.addEventListener('click', (e) => {
        load_form(prop);
    });
};


var load_form = function (x) {
    switch (x) {
        case loginSwitch:
            loopClass(signUpPage, loginPage, agreement);
            break;
        case signUpSwitch:
            loopClass(loginPage, signUpPage, agreement);
            break;
        case agreeSwitch:
            loopClass(agreement, loginPage, signUpPage);
            break;
    };
};

trigger.addEventListener('click', (e) => {
    e.preventDefault();
    loopClass(signUpPage, loginPage, agreement);
    pay.click();
});

var loopClass = function (p, q, r) {
    p.classList.remove('blind');
    other = [q, r];
    for (const prop of other) {
        if ((prop.classList.length - 1) !== 'blind') {
            prop.classList.add('blind')
        }
    }
};

loginCall.addEventListener('click', (e) => {
    e.preventDefault();
    loginBox.style.display = 'block';
    infoBox.style.display = 'none';
});



// ==================================================================================
//                             AJAX Call Functions
// ==================================================================================

// Container for all calls 
var app = {};

// Container for elements
app.elements = {
    'token': false,
    'email': '',
    'company': ''
};

// Interface for api requests
app.request = function (method, headers, path, queryStringObject, payload, callback) {
    // sanity check
    var method = typeof (method) == 'string' && ['GET', 'POST', 'PUT', 'DELETE'].indexOf(method) > -1 ? method : 'GET';
    var headers = typeof (headers) == 'object' && headers !== null ? headers : {};
    var path = typeof (path) == 'string' && path.length > 0 ? path : '/';
    var queryStringObject = typeof (queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {};
    var payload = typeof (payload) == 'object' && payload !== null ? payload : {};
    var callback = typeof (callback) == 'function' ? callback : false;

    // Append items in queryString to request url
    let requestUrl = path + '?';
    let count = 0;
    for (var prop in queryStringObject) {
        if (queryStringObject.hasOwnProperty(prop)) {
            count += 1;
            // Append '&' if more than one
            if (count > 1) {
                requestUrl += '&';
            }
            requestUrl += prop + '=' + queryStringObject[prop];
        }
    };


    console.log(method)

    // Initiate requests
    var request = new XMLHttpRequest();
    request.open(method, requestUrl, true);
    request.setRequestHeader('Content-Type', 'application/json');

    // Add header contents to setRequestHeader
    for (var prop in headers) {
        if (headers.hasOwnProperty(prop)) {
            request.setRequestHeader(prop, headers[prop]);
        }
    }

    // Add tokens to setRequestHeader
    if (app.elements.tokens) {
        request.setRequestHeader('token', app.elements.tokens)
    }

    // Handle Server Response
    request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE) {
            var statusCode = request.status;
            var response = request.responseText;

            // callback response if requested
            try {
                var responseObject = JSON.parse(response);
                callback(statusCode, responseObject);
            } catch (e) {
                callback(statusCode);
            }
        };
    }

    // Send payload to server 
    var payloadObject = JSON.stringify(payload);
    request.send(payloadObject);
};

// Get page forms
var forms = document.querySelectorAll('form');

// Loop thru forms
for (const form of forms) {
    form.addEventListener("submit", (e) => {
        // Prevent default submission
        e.preventDefault();

        // Login Form
        if (form.id == 'loginForm') {
            // Define Collectables
            var method = form.method;
            var path = form.action;
            let payload = {};
            let elements = form.elements;

            // Loop thru elements and get values
            for (var prop in elements) {
                if (elements[prop].type !== 'submit') {
                    payload[elements[prop].name] = elements[prop].value;
                };
            };

            console.log(payload)

            app.request('POST', undefined, path, undefined, payload, function (statusCode, response) {
                // Sanity check
                if (statusCode == 200) {
                    // Get server message
                    console.log(response);
                    var messageS = typeof (response.Status) == 'string' ? response.Status : 'Success, login';
                    var tokenId = typeof (response.Token) == 'string' ? response.Token : '';
                    localStorage.setItem('RR', JSON.stringify(tokenId));
                    animateNotification(messageS);
                    setTimeout(() => {
                        window.location.href = '/app';
                    }, 4000);
                } else {
                    var messageE = typeof (response.Error) == 'string' ? response.Error : 'An Error Ocurred, Try Again Later';
                    animateNotification(messageE);
                }
            });
        };

        // SignUp Form
        if (form.id == 'signUpForm') {
            // Define Collectables
            var method = form.method;
            var path = form.action;
            let payload = {};
            let elements = form.elements;
            checkRef(payload, path, method, elements, signUpSwitch, form);
        }
    });
}

// Get Reference Code
var checkRef = function (payload, path, method, elements, signUpSwitch, form) {
    var ref = document.getElementById('ref');
    var timer = setInterval(() => {
        if (ref.value !== '') {
            stopInt(timer, payload, path, method, elements, signUpSwitch, form);
        }
    }, 2000)
};

var stopInt = function (timer, payload, path, method, elements, signUpSwitch, form) {
    clearInterval(timer);

    for (var prop in elements) {
        if (elements[prop].type !== 'submit') {
            payload[elements[prop].name] = elements[prop].value;
        };
    };

    console.log(payload);

    app.request('POST', undefined, path, undefined, payload, function (statusCode, response) {
        // Sanity check
        if (statusCode == 200) {
            // Get server message
            console.log(response);
            var messageS = typeof (response.Status) == 'string' ? response.Status : 'Success';
            animateNotification(messageS);
            setTimeout(() => {
                signUpSwitch.click();
                form.reset();
            }, 4000);
        } else {
            var messageE = typeof (response.Error) == 'string' ? response.Error : 'An Error Ocurred, Try Again Later';
            animateNotification(messageE);
        }
    })
};




// ==================================================================================
//                              Animate Notification
// ==================================================================================
var animateNotification = function (message) {
    // Keyframes
    var anim_NOut = `@keyframes notifyOut {
        0%{
            transform: translateX(0) translateY(0);
            opacity: 1;
            }
        100%{
            transform: rotate(0) translateX(0) translateY(-150px);
            opacity: 0;
            }
    }

    .nPane {
        top: 50px;
        animation: notifyOut 0.5s 1 0s linear;
    }`;

    var anim_Nin = `@keyframes notifyIn {
        0%{
            transform: rotate(0) translateY(-150px) skewX(0) skewY(0);
            opacity: 0;
            }
        100%{
            transform: rotate(0) translateY(0) skewX(0) skewY(0);
            opacity: 1;
            }
    }

    .nPane {
        animation: notifyIn 0.5s 1 0s linear;
        top: 60px;

    }`;

    nPane.innerHTML = message;
    animateN.innerText = anim_Nin;
    setTimeout(() => {
        animateN.innerText = anim_NOut;
        setTimeout(() => {
            animateN.innerText = '';
        }, 500);
    }, 3000);
};

var rmSpn = function () {
    // Get DOM
    var spinner = document.getElementById('spinner');
    var spinner2 = document.getElementById('spinnerIn');
    var full = document.getElementById('cover');
    var nStyle = document.getElementById("animateS");
    var animate = `
    @keyframes showCover{
        0%{
            transform: scale(0.7);
            opacity: 0;
            }

        50%{
            transform: scale(1);
            opacity: 0;
            }

        100%{
            transform: scale(1);
            opacity: 1;
            }
    }
    
    .cover {
        animation: showCover 1.5s 1 0s linear;
    }`;

    setTimeout(() => {
        spinner.setAttribute('style', 'display: none');
        spinner2.classList.add('blind');
        full.removeAttribute('style');
        nStyle.innerHTML = animate;
        setTimeout(() => {
            nStyle.innerHTML = '';
        }, 2000);
    }, 1000);
};

var run = function () {
    var background = document.getElementById('cover');
    if (background.readyState !== 'loading') {
        rmSpn();
    } else if (background.addEventListener) {
        background.addEventListener('DOMContentLoaded', rmSpn);
    } else {
        background.attachEvent('onreadystatechange', function () {
            if (background.readyState !== 'loading') {
                rmSpn();
            };
        });
    }
};

window.onload = function () {
    run();
}