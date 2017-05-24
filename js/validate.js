(function (win, doc, util) {
    if (!win || !doc || !util) {
        throw Error('Initiate Tabs library failed .')
    }

    var REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var REGEX_PASSWORD_SPECIAL_CHAR = /[*@!#%&()^~{}]+/;
    var REGEX_PASSWORD_LETTER_CHAR = /[A-Za-z]+/;
    var REGEX_PASSWORD_DIGIT_CHAR = /[0-9]+/;

    var data = {};

    function validatePassword(str) {

        if (!str) {
            alert('Password is blank.');
        }

        if (!REGEX_PASSWORD_SPECIAL_CHAR.test(str)) {
            alert('Password must have at least one special symbol.');
        }
        if (!REGEX_PASSWORD_LETTER_CHAR.test(str)) {
            alert('Password must have at least one letter.');
        }
        if (!REGEX_PASSWORD_DIGIT_CHAR.test(str)) {
            alert('Password must have at least one number.');
        }
    }

    function validateEmail(str) {

        if (!str || !REGEX_EMAIL.test(str)) {
            alert('Email is not valid!');
        }
    }
    
    function validate() {
        validateEmail(data.email);
        validatePassword(data.password);
    }

    function onInputChange(e) {
        if (!e) { e = win.event }
        var callerElement = e.target || e.srcElement;

        data[callerElement.name] = callerElement.value;
    }

    function init() {
        var form = doc.getElementById('loginForm');
        var email = util.getElementsByAttribute('name', 'input', 'email')[0];
        var password = util.getElementsByAttribute('name', 'input', 'password')[0];

        util.forEach([
            email,
            password
        ], function (node) {
            util.addEvent(node, 'input', onInputChange);
        });

        util.addEvent(form, 'submit', function (e) {
            console.log('Data is validated with: ', data);
            e.preventDefault();
        });
    }

    util.addEvent(doc, 'DOMContentLoaded', function () {
        init();
    });
})(window, document, modalUtility);