(function (win, doc, util) {
    if (!win || !doc || !util) {
        throw Error('Initiate Tabs library failed .')
    }

    var data = {
        error: ""
    };
    
    function validate() {
        
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
            validate();
            e.preventDefault();
        });
    }

    util.addEvent(doc, 'DOMContentLoaded', function () {
        init();
    });
})(window, document, modalUtility);