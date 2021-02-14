// ==================================================================================
//                             PAGE Functions
// ==================================================================================

// Animate mobile page menu onclick
var mIcon = document.getElementById("m-icon");
var nIcon = document.getElementById("n-icon");
var mDropdown = document.getElementById("m-dropdown");
var sDropdown = document.getElementById("m-dropdown");
var dStyle = document.getElementById("animateM");
var nStyle = document.getElementById("animateS");
var dRgh = document.getElementById("rgh");

// Animate
mIcon.addEventListener('click', (e) => {
    style1 = `
    @keyframes slideOut{
        0%{
            transform: rotate(0) translateX(-300px) translateY(0) skewX(0) skewY(0);
            opacity: 0;
            }
        100%{
            transform: rotate(0) translateX(0px) translateY(0) skewX(0) skewY(0);
            opacity: 1;
            }
    }
    
    #m-dropdown{
    left: 0px;
        animation: slideOut 0.3s 1 0s ease-in-out;
        opacity: 1;
    }
    `
    style2 = `
    @keyframes slideIn{
        0%{
            transform: rotate(0) translateX(1px) translateY(0px) skewX(0) skewY(0);
            opacity: 1;
            }
        100%{
            transform: rotate(0) translateX(-300px) translateY(0px) skewX(0) skewY(0);
            opacity: 0;
            }
    }
    
    #m-dropdown{
        left: 0px;
        animation: slideIn 0.3s 1 0s ease;
    }
    `
    if (dStyle.innerText !== '') {
        dStyle.innerText = '';
        dStyle.innerText = style2;
        setTimeout(() => {
            dStyle.innerText = '';
        }, 300);
    } else {
        dStyle.innerText = style1;
    }

});

// Animate
var animateThreshold = function () {
    nIcon.addEventListener('click', (e) => {
        style3 = `
        @keyframes slideOut2{
            0%{
                transform: rotate(0) translateX(300px) translateY(0) skewX(0) skewY(0);
                opacity: 0;
                }
            100%{
                transform: rotate(0) translateX(0px) translateY(0) skewX(0) skewY(0);
                opacity: 1;
                }
        }
        
        #n-dropdown{
        right: 0px;
            animation: slideOut2 0.3s 1 0s ease-in-out;
            opacity: 1;
        }
        `
        style4 = `
        @keyframes slideIn2{
            0%{
                transform: rotate(0) translateX(-1px) translateY(0px) skewX(0) skewY(0);
                opacity: 1;
                }
            100%{
                transform: rotate(0) translateX(300px) translateY(0px) skewX(0) skewY(0);
                opacity: 0;
                }
        }
        
        #n-dropdown{
            right: 0px;
            animation: slideIn2 0.3s 1 0s ease;
        }
        `
        if (nStyle.innerText !== '') {
            nStyle.innerText = '';
            nStyle.innerText = style4;
            setTimeout(() => {
                nStyle.innerText = '';
            }, 300);
        } else {
            nStyle.innerText = style3;
        }

    })
}

dRgh.addEventListener('click', (e) => {
    style2 = `
    @keyframes slideIn{
        0%{
            transform: rotate(0) translateX(1px) translateY(0px) skewX(0) skewY(0);
            opacity: 1;
            }
        100%{
            transform: rotate(0) translateX(-300px) translateY(0px) skewX(0) skewY(0);
            opacity: 0;
            }
    }
    
    #m-dropdown{
        left: 0px;
        animation: slideIn 0.3s 1 0s ease;
    }
    `

    style3 = `
    @keyframes slideIn2{
        0%{
            transform: rotate(0) translateX(-1px) translateY(0px) skewX(0) skewY(0);
            opacity: 1;
            }
        100%{
            transform: rotate(0) translateX(300px) translateY(0px) skewX(0) skewY(0);
            opacity: 0;
            }
    }
    
    #m-dropdown{
        right: 0px;
        animation: slideIn 0.3s 1 0s ease;
    }
    `
    if (dStyle.innerText !== '') {
        dStyle.innerText = '';
        dStyle.innerText = style2;
        setTimeout(() => {
            dStyle.innerText = '';
        }, 300);
    }

    if (nStyle.innerText !== '') {
        nStyle.innerText = '';
        nStyle.innerText = style3;
        setTimeout(() => {
            nStyle.innerText = '';
        }, 300);
    }

});

// Dp triggers
var DpDiv = document.getElementById("do");
var DpBox = document.getElementById("dp");
var sDp = document.getElementById("s_dp");

DpDiv.addEventListener('click', (e) => {
    DpBox.click();
});

// Trigger for pages
var a = document.getElementById('load_dashboard');
var b = document.getElementById('load_addProduct');
var c = document.getElementById('load_productList');
var d = document.getElementById('load_registerPurchase');
var e = document.getElementById('load_purchaseList');
var f = document.getElementById('load_customerList');
var g = document.getElementById('load_settings');
var h = document.getElementById('logout');
var ma = document.getElementById('mload_dashboard');
var mb = document.getElementById('mload_addProduct');
var mc = document.getElementById('mload_productList');
var md = document.getElementById('mload_registerPurchase');
var me = document.getElementById('mload_purchaseList');
var mf = document.getElementById('mload_customerList');
var mg = document.getElementById('mload_settings');
var mh = document.getElementById('mlogout');
var more = document.getElementById("more");
var count = document.getElementById('dashboard');
var j = document.getElementById('add_Pr');
var k = document.getElementById('add_Pur');
var l = document.getElementById('Pr_list');
var m = document.getElementById('Pur_list');
var n = document.getElementById('Cus_list');
var o = document.getElementById('settings');

var Dom_List1 = [a, b, c, d, e, f, g, h];
for (const x of Dom_List1) {
    x.addEventListener('click', (e) => {
        load_Page(x);
    })
};

var Dom_List2 = [ma, mb, mc, md, me, mf, mg, mh];
for (const w of Dom_List2) {
    w.addEventListener('click', (e) => {
        load_mPage(w);
    })
};

var load_Page = function (x) {
    switch (x) {
        case a:
            loopClass(count, j, k, l, m, n, o);
            break;
        case b:
            loopClass(j, k, l, m, n, o, count);
            break;
        case c:
            loopClass(l, m, n, o, count, j, k);
            break;
        case d:
            loopClass(k, l, m, n, o, count, j);
            break;
        case e:
            loopClass(m, n, o, count, j, k, l);
            break;
        case f:
            loopClass(n, o, count, j, k, l, m);
            break;
        case g:
            loopClass(o, count, j, k, l, m, n);
            break;
        case h:
            console.log('Log Out')
            break;
    }
};

var load_mPage = function (w) {
    switch (w) {
        case ma:
            loopClass(count, j, k, l, m, n, o);
            dRgh.click();
            break;
        case mb:
            loopClass(j, k, l, m, n, o, count);
            dRgh.click();
            break;
        case mc:
            loopClass(l, m, n, o, count, j, k);
            dRgh.click();
            break;
        case md:
            loopClass(k, l, m, n, o, count, j);
            dRgh.click();
            break;
        case me:
            loopClass(m, n, o, count, j, k, l);
            dRgh.click();
            break;
        case mf:
            loopClass(n, o, count, j, k, l, m);
            dRgh.click();
            break;
        case mg:
            loopClass(o, count, j, k, l, m, n);
            dRgh.click();
            break;
        case mh:
            console.log('Log Out')
            dRgh.click();
            break;
    }
};

// more call function
var moreCall = function () {
    more.addEventListener('click', () => {
        e.click();
    });
}

var loopClass = function (p, q, r, s, t, u, v) {
    p.classList.remove('blind');
    other = [q, r, s, t, u, v];
    for (const prop of other) {
        if ((prop.classList.length - 1) !== 'blind') {
            prop.classList.add('blind')
        }
    };
};


// Notification switch
var selection = document.getElementById('switch');
var showN = document.getElementById('showN');

selection.addEventListener('click', (e) => {
    showN.innerHTML = selection.value;
});


// ==================================================================================
//                             AJAX Call Functions
// ==================================================================================

// Interface for api requests
var request = function (method, headers, path, queryStringObject, payload, callback) {
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

    // Initiate requests
    var request = new XMLHttpRequest();
    request.open(method, requestUrl, true);
    request.setRequestHeader('Content-Type', 'application/json');

    // Add header contents to setRequestHeader
    for (var prop in headers) {
        if (headers.hasOwnProperty(prop)) {
            request.setRequestHeader(prop, headers[prop]);
        }
    };

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

// Token Checker
var checkToken = function () {
    var RR = JSON.parse(localStorage.getItem('RR')) || '';
    if (RR !== '') {
        // Define queryStringObject
        var header = {};
        var path = 'session'
        header.token = RR;

        // Send request
        request('GET', header, path, undefined, undefined, function (statusCode, response) {
            if (statusCode == 200) {
                var expires = response.Expires;

                if (expires > Date.now()) {
                    setInterval(() => {
                        request('GET', header, path, undefined, undefined, function (statusCode, response) {
                            if (statusCode == 200) {
                                var expires = response.Expires;
                                if (expires - Date.now() <= 1000 * 60 * 10) {
                                    var queryStringObject = {};
                                    queryStringObject.extend = 'true';
                                    request('PUT', header, 'session', queryStringObject, undefined, function (statusCode, response) {
                                        if (statusCode !== 200) {
                                            console.log(response.Error);
                                        }
                                    });
                                }
                            }
                        })
                    }, 1000 * 60);

                } else {
                    request('DELETE', header, path, undefined, undefined, function (statusCode, response) {
                        // Sanity Check
                        if (statusCode == 200) {
                            localStorage.removeItem("RR");
                            var message = 'Session Has Expired, Login';
                            animateNotification(message);
                            setTimeout(() => {
                                window.location.href = '/';
                            }, 2000);
                        } else {
                            console.log(response.Error);
                        }
                    });
                }
            } else {
                localStorage.removeItem("RR");
                var message = 'Session Has Expired, Login';
                animateNotification(message);
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            }
        });
    }

    if (RR == '') {
        var message = 'Session Has Expired, Login';
        animateNotification(message);
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    }
}

// Render ProductList 
var getProductList = function () {
    // Get Container 
    var ListTable = document.getElementById('product_list');
    var proList = document.getElementById('plCnt');

    var header = {};
    // Get token
    var token = JSON.parse(localStorage.getItem('RR'));
    header.token = token;

    // Get companyID
    request('GET', header, 'session', undefined, undefined, function (statusCode, response) {
        if (statusCode == 200) {
            var queryStringObject = {};
            queryStringObject.company = response.User_ID;
            request('GET', header, 'product', queryStringObject, undefined, function (statusCode, response) {
                if (statusCode == 200 && response.length > 0) {
                    var count = 0;
                    // Loop thru
                    for (var prop of response) {
                        var date = new Date(prop.Expiry_Date);
                        var row = ListTable.insertRow(-1);
                        var cell1 = row.insertCell(0);
                        cell1.innerHTML = count += 1;
                        var cell2 = row.insertCell(1);
                        cell2.innerHTML = prop.Product_Name;
                        var cell3 = row.insertCell(2);
                        cell3.innerHTML = prop.Product_ID;
                        var cell4 = row.insertCell(3);
                        cell4.innerHTML = prop.Product_Quantity;
                        var cell5 = row.insertCell(4);
                        cell5.innerHTML = prop.Cost_Price;
                        var cell6 = row.insertCell(5);
                        cell6.innerHTML = prop.Sell_Price;
                        var cell7 = row.insertCell(6);
                        cell7.innerHTML = date.toLocaleDateString('en-GB');
                        var cell8 = row.insertCell(7);
                        var delB = document.createElement('a');
                        delB.id = prop.Product_Name;
                        delB.classList.add('del', 'proD');
                        delB.innerText = 'Remove';
                        cell8.innerHTML = delB.outerHTML;
                    }

                } else {
                    var noItem = `<p style="padding: 30px; margin: auto; text-align: center;" id='emptyPr'> --- empty --- </p>`;
                    ListTable.style.display = 'none';
                    proList.insertAdjacentHTML('beforeend', noItem);
                }
            });
        } else {
            console.log(response.Error);
        }
    });

};

// Fetch purchase list function
var getPurchaseList = function () {
    // Get Container 
    var ListTable = document.getElementById('purchase_list');
    var purList = document.getElementById('purCnt');

    var header = {};
    // Get token
    var token = JSON.parse(localStorage.getItem('RR'));
    header.token = token;

    // Get companyID
    request('GET', header, 'session', undefined, undefined, function (statusCode, response) {
        if (statusCode == 200) {
            var queryStringObject = {};
            queryStringObject.company = response.User_ID;
            request('GET', header, 'purchase', queryStringObject, undefined, function (statusCode, response) {
                if (statusCode == 200 && response.length > 0) {
                    var count = 0;
                    // Loop thru
                    for (var prop of response) {
                        var date = new Date(prop.Date);
                        var row = ListTable.insertRow(-1);
                        var cell1 = row.insertCell(0);
                        cell1.innerHTML = count += 1;
                        var cell2 = row.insertCell(1);
                        cell2.innerHTML = prop.Customer_Name;
                        var cell3 = row.insertCell(2);
                        cell3.innerHTML = prop.Phone_no;
                        var cell4 = row.insertCell(3);
                        cell4.innerHTML = prop.Purchase_ID;
                        cell4.setAttribute('style', 'text-transform: lowercase;')
                        var cell5 = row.insertCell(4);
                        cell5.innerHTML = prop.Product_Name;
                        var cell6 = row.insertCell(5);
                        cell6.innerHTML = prop.Quantity;
                        var cell7 = row.insertCell(6);
                        cell7.innerHTML = prop.Total;
                        var cell8 = row.insertCell(7);
                        cell8.innerHTML = date.toDateString();
                    }

                } else {
                    var noItem = `<p style="padding: 30px; margin: auto; text-align: center;" id='emptyPur'> --- empty --- </p>`;
                    ListTable.style.display = 'none';
                    purList.insertAdjacentHTML('beforeend', noItem);
                }
            });
        } else {
            console.log(response.Error);
        }
    });
};

// Get Profile Details
var getProfileSettings = function () {
    // Get Container 
    var profilePic = document.getElementById('do');
    var showN = document.getElementById('showN');
    var limit = document.getElementById('limit');
    var cName = document.getElementById('Cname');
    var firstN = document.getElementById('sfirst');
    var pfirstN = document.getElementById('first');
    var plastN = document.getElementById('last');
    var lastN = document.getElementById('slast');
    var emailBox = document.getElementById('semail2');
    var pemailBox = document.getElementById('email');
    var dp = document.getElementById('dp');
    var lftPic = document.getElementById('lftPic');
    var mPic = document.getElementById('mPic');
    var l_Tle = document.getElementById('l_Tle');
    var m_Tle = document.getElementById('m_Tle');
    var cardType = document.getElementById('cardType');
    var cardNum = document.getElementById('cardNum');
    var cardExp = document.getElementById('cardExp');
    var phone = document.getElementById('phone');

    var header = {};
    // Get token
    var token = JSON.parse(localStorage.getItem('RR'));
    header.token = token;

    // Get companyID
    request('GET', header, 'session', undefined, undefined, function (statusCode, response) {
        if (statusCode == 200) {
            var queryStringObject = {};
            queryStringObject.company = response.User_ID;
            queryStringObject.email = response.Email;
            request('GET', header, 'user', queryStringObject, undefined, function (statusCode, response) {
                if (statusCode == 200) {
                    if (response.Notification !== '') {
                        showN.innerText = response.Notification;
                    } else {
                        showN.innerText = 'on';
                    }

                    if (response.Profile_Pic !== '') {
                        var img = `background-image: url('assets/default/${response.Profile_Pic}')`
                        profilePic.setAttribute('style', img);
                        lftPic.setAttribute('style', img);
                        mPic.setAttribute('style', img);
                    } else {
                        var img = `background-image: url('assets/default/${profilePic.png}')`
                        profilePic.setAttribute('style', img);
                        lftPic.setAttribute('style', img);
                        mPic.setAttribute('style', img);
                    }

                    cName.value = response.Company_Name;
                    l_Tle.innerText = response.Company_Name;
                    m_Tle.innerText = response.Company_Name;
                    limit.value = response.Threshold;
                    emailBox.value = response.Email;
                    pemailBox.value = response.Email;
                    dp.name = token;
                    firstN.value = response.Firstname;
                    pfirstN.value = response.Firstname;
                    lastN.value = response.Lastname;
                    plastN.value = response.Lastname;
                    cardNum.innerText = 'XXXX - XXXX - XXXX - ' + response.Card_Details.last4;
                    cardType.innerText = response.Card_Details.card_type;
                    cardExp.innerText = 'Expiry Date: ' + response.Card_Details.exp_month + '/' + response.Card_Details.exp_year;
                    phone.value = response.Phone;
                } else {
                    console.log(response.Error);
                }
            });
        } else {
            console.log(response.Error);
        }
    });
}

// Fetch purchase list function
var getCustomerList = function () {
    // Get Container 
    var ListTable = document.getElementById('customer_list');
    var cusList = document.getElementById('csCnt');

    var header = {};
    // Get token
    var token = JSON.parse(localStorage.getItem('RR'));
    header.token = token;

    // Get companyID
    request('GET', header, 'session', undefined, undefined, function (statusCode, response) {
        if (statusCode == 200) {
            var queryStringObject = {};
            queryStringObject.company = response.User_ID;
            request('GET', header, 'customer', queryStringObject, undefined, function (statusCode, response) {
                if (statusCode == 200 && response.length > 0) {
                    var count = 0;
                    // Loop thru
                    for (var prop of response) {
                        var items = `
                        <tr>
                            <td>${count += 1}</td>
                            <td>${prop.Customer_Name}</td>
                            <td>${prop.Email}</td>
                            <td>${prop.Phone_no}</td>
                            <td>
                                <a class="del cusD" data-customer="${prop.Email}">Delete</a>
                            </td>
                        </tr>`;

                        ListTable.insertAdjacentHTML('beforeend', items);
                    }

                } else {
                    var noItem = `<p style="padding: 30px; margin: auto; text-align: center;"> --- empty --- </p>`;
                    ListTable.style.display = 'none';
                    cusList.insertAdjacentHTML('beforeend', noItem);
                }
            });
        } else {
            console.log(response.Error);
        }
    });
};

// Threshold Monitor
var thresholdProducts = function () {
    // GEt Container
    var nofCont = document.getElementById('BB');
    var notFNum = document.getElementById('notFNum');

    var header = {};
    // Get token
    var token = JSON.parse(localStorage.getItem('RR'));
    header.token = token;

    // Get companyID
    request('GET', header, 'session', undefined, undefined, function (statusCode, response) {
        if (statusCode == 200) {
            var queryStringObject = {};
            queryStringObject.company = response.User_ID;
            var threshold = parseInt(response.Threshold);

            request('GET', header, 'product', queryStringObject, undefined, function (statusCode, response) {
                if (statusCode == 200) {
                    if (response.length == 0) {
                        notFNum.setAttribute('style', 'display: none;');
                    } else {
                        for (var prop of response) {
                            if (parseInt(prop.Product_Quantity) < threshold) {
                                for (var prop of response) {
                                    if (parseInt(prop.Product_Quantity) < threshold) {
                                        var item = `<li>${prop.Product_Name}</li>`;
                                    }
    
                                    nofCont.insertAdjacentHTML('beforeend', item);
                                };
    
                                animateThreshold();
                            }
                        };
                    }
                }
            });
        }
    });
};

// Render Dashboard
var Dashboard = function () {
    // Get Container 
    var totalProducts = document.getElementById('pNum');
    var totalCustomers = document.getElementById('cNum');
    var totalSales = document.getElementById('mNum');
    var displayAtv = document.getElementById('dpyAct');
    var displayAtvA = document.getElementById('dpyActv');
    var salesBlock = document.getElementById('salesB');
    var spinner = document.getElementById('spinner');
    var spinner2 = document.getElementById('spinnerIn');
    var full = document.getElementById('newC');
    var notFNum = document.getElementById('notFNum');

    var header = {};
    // Get token
    var token = JSON.parse(localStorage.getItem('RR'));
    header.token = token;

    // Get companyID
    request('GET', header, 'session', undefined, undefined, function (statusCode, response) {
        if (statusCode == 200) {
            var queryStringObject = {};
            queryStringObject.company = response.User_ID;
            var threshold = parseInt(response.Threshold);
            var count = 0;
            request('GET', header, 'product', queryStringObject, undefined, function (statusCode, response) {
                if (statusCode == 200) {
                    totalProducts.innerText = response.length;
                    for (var prop of response) {
                        if (parseInt(prop.Product_Quantity) < threshold) {
                            count += 1;
                        }
                    };

                    notFNum.innerText = count;
                    request('GET', header, 'customer', queryStringObject, undefined, function (statusCode, response) {
                        if (statusCode == 200) {
                            totalCustomers.innerText = response.length || '0';

                            request('GET', header, 'purchase', queryStringObject, undefined, function (statusCode, response) {
                                if (statusCode == 200 && response.length > 0) {
                                    if (response.length <= 5) {
                                        for (var prop of response) {
                                            var date = new Date(prop.Date);
                                            var item = `<div class="d6 col-12">
                                                            <div class="col-7 product">
                                                                <count class="fa fa-box"></count> &nbsp; <a>${prop.Product_Name}</a>
                                                                <p>${prop.Product_ID}</p>
                                                            </div>
                                                            <div class="col-4 time">
                                                                <p style="margin-right: 12px;">${prop.Time}</p>
                                                                <p>${date.toDateString()}</p>
                                                            </div>
                                                        </div>`

                                            displayAtvA.insertAdjacentHTML('afterend', item);
                                        }
                                        
                                    } else {
                                        var count = response.length - 1;
                                        while (count !== response.length - 6) {
                                            var date = new Date(response[count].Date);
                                            var item = `<div class="d6 col-12">
                                                                <div class="col-7 product">
                                                                    <count class="fa fa-box"></count> &nbsp; <a>${response[count].Product_Name}</a>
                                                                    <p>${response[count].Product_ID}</p>
                                                                </div>
                                                                <div class="col-4 time">
                                                                    <p style="margin-right: 12px;">${response[count].Time}</p>
                                                                    <p>${date.toDateString()}</p>
                                                                </div>
                                                            </div>`

                                            displayAtvA.insertAdjacentHTML('afterend', item);
                                            count -= 1;
                                        }
                                    };

                                    // Get Sales
                                    var d = new Date();
                                    var monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                    var month = monthArray[d.getMonth()];
                                    var year = d.getFullYear();

                                    queryStringObject.month = month;
                                    queryStringObject.year = year;

                                    request('GET', header, 'sales', queryStringObject, undefined, function (statusCode, response) {
                                        if (statusCode == 200) {
                                            var saleM = response.Sale.toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'USD'
                                            }) || '0';
                                            var text = '₦ ' + saleM.replace('$', '') + '<span style="color: black;"> (This Month)</span>';
                                            salesBlock.innerHTML = text;

                                            request('GET', header, 'totalSales', queryStringObject, undefined, function (statusCode, response) {
                                                if (statusCode == 200) {
                                                    console.log(response)
                                                    var saleM = response.Sale.toLocaleString('en-US', {
                                                        style: 'currency',
                                                        currency: 'USD'
                                                    }) || '0';
                                                    var text = '₦ ' + saleM.replace('$', '') + '<span style="color: black;"> (This Month)</span>';
                                                    // salesBlock.innerHTML = text;
                                                    totalSales.innerHTML = text;

                                                    // Get Chart data
                                                    request('GET', header, 'charts', queryStringObject, undefined, function (statusCode, response) {
                                                        if (statusCode == 200) {
                                                            // console.log(response.Array.length);
                                                            var Array = response.Array;
                                                            var title = [];
                                                            var len = response.Array.length + 1 || 31;
                                                            for (var i = 1; i < len; i++) {
                                                                title.push(i);
                                                            };

                                                            // Bar Chart
                                                            var data = {
                                                                labels: title,
                                                                series: [
                                                                    Array
                                                                ]
                                                            };

                                                            var options = {
                                                                axisX: {
                                                                    showGrid: false
                                                                },
                                                            };

                                                            var responsiveOptions = [
                                                                ['screen and (max-width: 992px)', {
                                                                    width: 992,
                                                                    height: 300
                                                                }],
                                                                ['screen and (min-width: 993px)', {
                                                                    seriesBarDistance: 10,
                                                                    height: 300
                                                                }]
                                                            ];


                                                            checkValidity();
                                                            setTimeout(() => {
                                                                spinner.setAttribute('style', 'display: none');
                                                                spinner2.classList.add('blind');
                                                                full.removeAttribute('style');

                                                                new Chartist.Bar('.ct-chart', data, options, responsiveOptions);
                                                                delItemA();
                                                                delItemB();
                                                                new Chartist.Bar('.ct-chart', data, options, responsiveOptions);
                                                            }, 5000);
                                                            new Chartist.Bar('.ct-chart', data, options, responsiveOptions);
                                                        } else {
                                                            console.log(response.Error);
                                                        }
                                                    });
                                                } else {
                                                    console.log(response.Error);
                                                }
                                            });
                                            
                                        } else {
                                            console.log(response.Error);
                                        }
                                    });
                                    

                                    // moreCall();
                                } else {
                                    var noItem = `
                                    <h6 id="dpyActv">Activities</h6>
                                    <p style="padding: 30px; margin: auto; text-align: center;"> --- No Activities Yet --- </p>`;
                                    displayAtv.innerHTML = noItem;

                                    var saleM = 0;
                                    var text = '₦ ' + saleM;
                                    salesBlock.innerText = text;
                                    totalSales.innerText = text;

                                    // Get Chart data
                                    var Array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                    var title = [];
                                    var len = Array.length + 1 || 31;
                                    for (var i = 1; i < len; i++) {
                                        title.push(i);
                                    };

                                    // Bar Chart
                                    var data = {
                                        labels: title,
                                        series: [
                                            Array
                                        ]
                                    };

                                    var options = {
                                        axisX: {
                                            showGrid: false
                                        },
                                    };

                                    var responsiveOptions = [
                                        ['screen and (max-width: 992px)', {
                                            width: 992,
                                            height: 300
                                        }],
                                        ['screen and (min-width: 993px)', {
                                            seriesBarDistance: 10,
                                            height: 300
                                        }]
                                    ];

                                    checkValidity();
                                    setTimeout(() => {
                                        spinner.setAttribute('style', 'display: none');
                                        spinner2.classList.add('blind');
                                        full.removeAttribute('style');

                                        new Chartist.Bar('.ct-chart', data, options, responsiveOptions);
                                        delItem();
                                    }, 5000);
                                    new Chartist.Bar('.ct-chart', data, options, responsiveOptions);
                                }
                                new Chartist.Bar('.ct-chart', data, options, responsiveOptions);
                            });
                        } else {
                            console.log(response.Error);
                        }
                    });
                } else {
                    console.log(response.Error);
                }
            });
        } else {
            console.log(response.Error);
        }
    });
}

// Log Out function
var logoutFxn = function () {
    var logoutBtn1 = document.getElementById('l_logOut');
    var logoutBtn2 = document.getElementById('m_logOut');
    var BtnArr = [logoutBtn1, logoutBtn2];

    for (var prop of BtnArr) {
        prop.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('RR');
            window.location.href = '/';
        });
    }
};

// Sync Product Id
var syncProductId = function () {
    var idDiv = document.getElementById('productIdS');
    var pdn = document.getElementById('pdn');

    idDiv.addEventListener('change', (e) => {
        var productId = idDiv.value;
        var header = {};
        // Get token
        var token = JSON.parse(localStorage.getItem('RR'));
        header.token = token;

        // Get companyID
        request('GET', header, 'session', undefined, undefined, function (statusCode, response) {
            if (statusCode == 200) {
                var queryStringObject = {};
                queryStringObject.company = response.User_ID;
                queryStringObject.productId = productId;
                request('GET', header, 'purchaseID', queryStringObject, undefined, function (statusCode, response) {
                    if (statusCode == 200) {
                        pdn.value = response.Product_Name;
                    } else {
                        var messageE = 'Product ID Does Not Exist';
                        animateNotification(messageE);
                        pdn.value = '';
                    }
                });
            } else {
                console.log(response.Error);
            }
        });
    });
}

// Delete Buttons
var delItemA = function () {
    // Get all button
    var buttonsPro = document.querySelectorAll('a.proD');
    // var buttonsCus = document.querySelectorAll('a.cusD');

    for (var prop of buttonsPro) {
        prop.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(prop);
            var productName = prop.id;
            var header = {};
            // Get token
            var token = JSON.parse(localStorage.getItem('RR'));
            header.token = token;

            // Get companyID
            request('GET', header, 'session', undefined, undefined, function (statusCode, response) {
                if (statusCode == 200) {
                    var queryStringObject = {};
                    queryStringObject.company = response.User_ID;
                    queryStringObject.name = productName;
                    request('DELETE', header, 'product', queryStringObject, undefined, function (statusCode, response) {
                        if (statusCode == 200) {
                            var messageS = 'Success';
                            animateNotification(messageS);
                            getProductList();
                            setTimeout(() => {
                                Dashboard();
                            }, 2000);
                        } else {
                            console.log(response.Error);
                        }
                    });
                } else {
                    console.log(response.Error);
                }
            });
        });
    };
};

// Delete Buttons
var delItemB = function () {
    // Get all button
    // var buttonsPro = document.querySelectorAll('a.proD');
    var buttonsCus = document.querySelectorAll('a.cusD');

    for (var prop of buttonsCus) {
        prop.addEventListener('click', (e) => {
            e.preventDefault();
            var email = prop.dataset.customer.toLowerCase();
            var header = {};
            // Get token
            var token = JSON.parse(localStorage.getItem('RR'));
            header.token = token;

            // Get companyID
            request('GET', header, 'session', undefined, undefined, function (statusCode, response) {
                if (statusCode == 200) {
                    var queryStringObject = {};
                    queryStringObject.company = response.User_ID;
                    queryStringObject.email = email;
                    request('DELETE', header, 'customer', queryStringObject, undefined, function (statusCode, response) {
                        if (statusCode == 200) {
                            var messageS = 'Success';
                            animateNotification(messageS);
                            getCustomerList();
                        } else {
                            console.log(response.Error);
                        }
                    });
                } else {
                    console.log(response.Error);
                }
            });
        });
    };
};

// Get Validity
var checkValidity = function () {
    // Get Container 
    var dashboard = document.getElementById('full');
    var payment = document.getElementById('payment');

    var header = {};
    // Get token
    var token = JSON.parse(localStorage.getItem('RR'));
    header.token = token;

    // Get companyID
    request('GET', header, 'session', undefined, undefined, function (statusCode, response) {
        if (statusCode == 200) {
            var queryStringObject = {};
            queryStringObject.company = response.User_ID;
            queryStringObject.email = response.Email;
            request('GET', header, 'user', queryStringObject, undefined, function (statusCode, response) {
                if (statusCode == 200) {
                    if (!response.Active) {
                        payment.classList.remove('blind');
                    } else {
                        dashboard.classList.remove('blind');
                    }
                } else {
                    console.log(response.Error);
                }
            });
        } else {
            console.log(response.Error);
        }
    });
}

var formExecutor = function () {
    // Get page forms
    var forms = document.querySelectorAll('form');

    // Loop thru forms
    for (const form of forms) {
        // Add Listener
        if (form.id !== 'dpForm') {
            form.addEventListener('submit', (e) => {
                // Prevent default submission
                e.preventDefault();

                // Add Product Form
                if (form.id == 'addProduct') {
                    var header = {};
                    // Get Token
                    var RR = JSON.parse(localStorage.getItem('RR'));
                    var ListTable = document.getElementById('product_list');
                    var emptyMsg = document.getElementById('emptyPr');
                    // Add token to header
                    header.token = RR;

                    // Fetch company ID
                    request('GET', header, 'session', undefined, undefined, function (statusCode, response) {
                        if (statusCode == 200) {
                            // Define Collectables
                            var queryStringObject = {};
                            queryStringObject.company = response.User_ID;
                            var id = response.User_ID;
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

                            // Add Company ID
                            payload.company = id;

                            request('POST', header, path, undefined, payload, function (statusCode, response) {
                                // Sanity check
                                if (statusCode == 200) {
                                    request('GET', header, 'product', queryStringObject, undefined, function (statusCode, response) {
                                        if (statusCode == 200 && response) {
                                            ListTable.innerHTML = '';
                                            var count = 0;
                                            // Loop thru
                                            for (var prop of response) {
                                                var date = new Date(prop.Expiry_Date);
                                                var row = ListTable.insertRow(-1);
                                                var cell1 = row.insertCell(0);
                                                cell1.innerHTML = count += 1;
                                                var cell2 = row.insertCell(1);
                                                cell2.innerHTML = prop.Product_Name;
                                                var cell3 = row.insertCell(2);
                                                cell3.innerHTML = prop.Product_ID;
                                                var cell4 = row.insertCell(3);
                                                cell4.innerHTML = prop.Product_Quantity;
                                                var cell5 = row.insertCell(4);
                                                cell5.innerHTML = prop.Cost_Price;
                                                var cell6 = row.insertCell(5);
                                                cell6.innerHTML = prop.Sell_Price;
                                                var cell7 = row.insertCell(6);
                                                cell7.innerHTML = date.toLocaleDateString('en-GB');
                                                var cell8 = row.insertCell(7);
                                                var delB = document.createElement('a');
                                                delB.id = prop.Product_Name;
                                                delB.classList.add('del', 'proD');
                                                delB.innerText = 'Remove';
                                                cell8.innerHTML = delB.outerHTML;
                                            }

                                            // Get server message
                                            form.reset();
                                            var messageS = 'Success';
                                            animateNotification(messageS);
                                            ListTable.removeAttribute('style');
                                            emptyMsg.style.display = 'none';
                                            Dashboard();
                                        }
                                    });
                                } else {
                                    var messageE = typeof (response.Error) == 'string' ? response.Error : 'An Error Ocurred, Try Again Later';
                                    animateNotification(messageE);
                                }
                            });
                        } else {
                            console.log(response.Error);
                        }
                    });
                }

                // Add Purchase Form
                if (form.id == 'addPurchase') {
                    var header = {};
                    // Get Token
                    var RR = JSON.parse(localStorage.getItem('RR'));
                    var ListTable = document.getElementById('purchase_list');
                    var emptyMsg = document.getElementById('emptyPur');
                    // Add token to header
                    header.token = RR;

                    // Fetch company ID
                    request('GET', header, 'session', undefined, undefined, function (statusCode, response) {
                        if (statusCode == 200) {
                            // Define Collectables
                            var queryStringObject = {};
                            queryStringObject.company = response.User_ID;
                            var id = response.User_ID;
                            var method = form.method;
                            var path = form.action;
                            let payload = {};
                            let elements = form.elements;
                            var d = new Date();
                            var hour = d.getHours();
                            var minutes = d.getMinutes();
                            var day = d.getDate();
                            var monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                            var month = monthArray[d.getMonth()];
                            var year = d.getFullYear();
                            var time = '';
                            if (hour > 12) {
                                var h = hour - 12;
                                var m = minutes;
                                time = h + ':' + m + 'pm';
                            } else {
                                var h = hour;
                                var m = minutes;
                                time = h + ':' + m + 'am';
                            }

                            // Loop thru elements and get values
                            for (var prop in elements) {
                                if (elements[prop].type !== 'submit') {
                                    payload[elements[prop].name] = elements[prop].value;
                                };
                            };

                            // Add Company ID
                            payload.company = id;
                            payload.time = time;
                            payload.day = day;
                            payload.month = month;
                            payload.year = year;

                            request('POST', header, path, undefined, payload, function (statusCode, response) {
                                // Sanity check
                                if (statusCode == 200) {
                                    // Update Revenue
                                    request('POST', header, "totalSales", undefined, payload, function (statusCode, response) {
                                        // Sanity check
                                        if (statusCode == 200) {
                                            // Update Sales
                                            request('POST', header, "sales", undefined, payload, function (statusCode, response) {
                                                // Sanity check
                                                if (statusCode == 200) {
                                                    // Update Chart
                                                    request('POST', header, "charts", undefined, payload, function (statusCode, response) {
                                                        // Sanity check
                                                        if (statusCode == 200) {
                                                            request('GET', header, 'purchase', queryStringObject, undefined, function (statusCode, response) {
                                                                console.log(response)
                                                                if (statusCode == 200) {
                                                                    ListTable.innerHTML = '';
                                                                    var count = 0;
                                                                    // Loop thru
                                                                    for (var prop of response) {
                                                                        var date = new Date(prop.Date);
                                                                        var row = ListTable.insertRow(-1);
                                                                        var cell1 = row.insertCell(0);
                                                                        cell1.innerHTML = count += 1;
                                                                        var cell2 = row.insertCell(1);
                                                                        cell2.innerHTML = prop.Customer_Name;
                                                                        var cell3 = row.insertCell(2);
                                                                        cell3.innerHTML = prop.Phone_no;
                                                                        var cell4 = row.insertCell(3);
                                                                        cell4.innerHTML = prop.Purchase_ID;
                                                                        cell4.setAttribute('style', 'text-transform: lowercase;')
                                                                        var cell5 = row.insertCell(4);
                                                                        cell5.innerHTML = prop.Product_Name;
                                                                        var cell6 = row.insertCell(5);
                                                                        cell6.innerHTML = prop.Quantity;
                                                                        var cell7 = row.insertCell(6);
                                                                        cell7.innerHTML = prop.Total;
                                                                        var cell8 = row.insertCell(7);
                                                                        cell8.innerHTML = date.toDateString();
                                                                    }

                                                                    // Get server message
                                                                    form.reset();
                                                                    var messageS = 'Success';
                                                                    animateNotification(messageS);
                                                                    ListTable.removeAttribute('style');
                                                                    emptyMsg.style.display = 'none';
                                                                    Dashboard();
                                                                }
                                                            });
                                                        } else {
                                                            console.log(response.Error);
                                                        }
                                                    });
                                                } else {
                                                    console.log(response.Error);
                                                }
                                            });
                                        } else {
                                            console.log(response.Error);
                                        }
                                    });
                                } else {
                                    console.log(response.Error);
                                }
                            });
                        } else {
                            console.log(response.Error);
                        }
                    });
                };

                // Edit Settings Form
                if (form.id == 'settingFm') {
                    var header = {};
                    // Get Token
                    var RR = JSON.parse(localStorage.getItem('RR'));
                    // Add token to header
                    header.token = RR;

                    // Fetch company ID
                    request('GET', header, 'session', undefined, undefined, function (statusCode, response) {
                        if (statusCode == 200) {
                            // Define Collectables
                            var id = response.User_ID;
                            var path = form.action;
                            let payload = {};
                            let elements = form.elements;

                            // Loop thru elements and get values
                            for (var prop in elements) {
                                if (elements[prop].type !== 'submit') {
                                    payload[elements[prop].name] = elements[prop].value;
                                };
                            };

                            // Add Company ID
                            payload.company = id;

                            request('PUT', header, path, undefined, payload, function (statusCode, response) {
                                // Sanity check
                                if (statusCode == 200) {
                                    // Get server message
                                    var messageS = typeof (response.Status) == 'string' ? response.Status : 'Profile Updated Successfully';
                                    animateNotification(messageS);
                                    getProfileSettings();
                                } else {
                                    var messageE = typeof (response.Error) == 'string' ? response.Error : 'An Error Ocurred, Try Again Later';
                                    animateNotification(messageE);
                                }
                            });
                        } else {
                            console.log(response.Error);
                        }
                    });
                };

                // Payment Form
                if (form.id == 'signUpForm') {
                    // Define Collectables
                    var method = form.method;
                    var path = form.action;
                    let payload = {};
                    let elements = form.elements;
                    checkRef(payload, path, method, elements);
                    form.reset();
                    setTimeout(() => {
                        signUpSwitch.click();
                    }, 4000);
                }
            });
        }
    };
};


// Get Reference Code
var checkRef = function (payload, path, method, elements) {
    var ref = document.getElementById('ref');
    var timer = setInterval(() => {
        if (ref.value !== '') {
            stopInt(timer, payload, path, method, elements);
        }
    }, 2000)
};

var stopInt = function (timer, payload, path, method, elements) {
    clearInterval(timer);

    var header = {};
    // Get Token
    var RR = JSON.parse(localStorage.getItem('RR'));
    // Add token to header
    header.token = RR;

    // Fetch company ID
    request('GET', header, 'session', undefined, undefined, function (statusCode, response) {
        if (statusCode == 200) {
            // Define Collectables
            var id = response.User_ID;

            for (var prop in elements) {
                if (elements[prop].type !== 'submit') {
                    payload[elements[prop].name] = elements[prop].value;
                };
            };

            // Add Company ID
            payload.company = id;

            app.request('PUT', undefined, path, undefined, payload, function (statusCode, response) {
                // Sanity check
                if (statusCode == 200) {
                    // Get server message
                    console.log(response);
                    var messageS = typeof (response.Status) == 'string' ? response.Status : 'Success';
                    animateNotification(messageS);
                } else {
                    var messageE = typeof (response.Error) == 'string' ? response.Error : 'An Error Ocurred, Try Again Later';
                    animateNotification(messageE);
                }
            })
        } else {
            console.log(response.Error);
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


window.onload = function () {
    checkToken();
    formExecutor();
    getProductList();
    getPurchaseList();
    getCustomerList();
    getProfileSettings();
    logoutFxn();
    syncProductId();
    Dashboard();
    thresholdProducts();
};
