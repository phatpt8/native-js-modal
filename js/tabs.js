(function (win, doc, util) {
    if (!win || !doc || !util) {
        throw Error('Initiate Tabs library failed .')
    }

    var TAB_ACTIVE_CLASS = 'active';
    var tabElements = {};
    var tabActive = '0';

    function initEvents(elm) {
        if (elm.tabDefault.length > 0) {
            var initActiveTab = elm.tabDefault[0];
            tabActive = initActiveTab.getAttribute('data-tab-active') || '0';
        }

        resetHeader(elm, tabActive);
        resetContent(elm, tabActive);
    }

    function resetHeader(elm, except) {
        util.forEach(elm.tabActive, function (element) {
            if (element.nodeType === 1) {
                if (element.getAttribute('data-tab-active') === except) {
                    util.addClass(element, TAB_ACTIVE_CLASS);
                } else {
                    util.removeClass(element, TAB_ACTIVE_CLASS);
                }
            }
        })
    }

    function resetContent(elm, except) {
        util.forEach(elm.tab, function (element) {
            if (element.nodeType === 1) {
                if (element.getAttribute('data-tab') === except) {
                    util.removeClass(element, 'md-init-hidden');
                } else {
                    util.addClass(element, 'md-init-hidden');
                }
            }
        })
    }

    function setEvents(elm) {
        util.forEach(elm.tabActive, function (element) {
            util.addEvent(element, 'click', onHeaderClick);
        })
    }
    
    function onHeaderClick(e) {
        if (!e) { e = win.event }
        var callerElement = e.target || e.srcElement;
        var attrTabActive = callerElement.getAttribute('data-tab-active');

        if (attrTabActive !== tabActive) {
            tabActive = attrTabActive;
            resetHeader(tabElements, tabActive);
            resetContent(tabElements, tabActive);
        }
    }

    function decorateAttribute(attribute) {
        var parts = attribute.split('data-')[1].split('-');
        return parts[0] + (parts[1] ? (parts[1].charAt(0).toUpperCase() + parts[1].substr(1).toLowerCase()) : '');
    }

    function init() {

        util.forEach([
            'data-tab-default',
            'data-tab-active',
            'data-tab'
        ], function (attribute) {
            var element = util.getElementsByAttribute(attribute);

            //make an exeption for attribute data-tab-active
            if (attribute === 'data-tab-default' && !element.length) {
                element = [undefined]; // skip throw error
            }

            if (!element.length) {
                throw Error('Tabs: Element with attribute "' + attribute + '" is not found.');
            }

            tabElements[decorateAttribute(attribute)] = element; // Currently only accept 1 element
        }.bind(this));

        if (tabElements.tabActive.length !== tabElements.tab.length) {
            throw Error('Tabs: Tab Headers and Contents are not equal');
        }

        initEvents(tabElements);
        setEvents(tabElements);
    }

    util.addEvent(doc, 'DOMContentLoaded', function () {
        init();
    });
})(window, document, modalUtility);