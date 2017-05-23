(function(win, doc, util) {
    if (!win || !doc || !util) {
        throw Error('Initiate Vanilla Modal library failed .')
    }

    var MODAL_WRAPPER_ID = "modal_wrapper";
    var MODAL_ID = "modal_" + Date.now();

    var VanillaModal = function () {
        this.options = {};
        this.vmWrapper = null;
        this.loaded = true;
    };

    VanillaModal.prototype._createWrapper = function () {
        if (this.vmWrapper) return this.vmWrapper;

        var wrapper = doc.createElement('div');
        wrapper.id = MODAL_WRAPPER_ID;
        util.css(wrapper, 'display: none; z-index: 8888; position: fixed; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0, 0, 0, 0.4);');
        util.addEvent(wrapper, 'click', this.close.bind(this));
        this.vmWrapper = wrapper;
        return wrapper;
    };

    VanillaModal.prototype._appendToBody = function (node, context) {
        var body = (context || doc).getElementsByTagName('body')[0];
        body.appendChild(node);
        return this;
    };

    VanillaModal.prototype._addModalClass = function () {
        util.forEach([
            'md-init-hidden',
            'md-center-middle-align',
            'md-bg-dark'
        ], function (klassName) {
            util.addClass(this.options.vmModal, klassName);
        }.bind(this));
    };

    VanillaModal.prototype.open = function () {
        var opt = this.options;
        this.vmWrapper.appendChild(opt.vmModal);
        this.vmWrapper.style.display = "block";
        util.removeClass(opt.vmModal, 'md-init-hidden')
    };

    VanillaModal.prototype.close = function (e) {
        if (!e && !win.event) return;
        if (!e) { e = win.event }
        var callerElement = e.target || e.srcElement;

        // if target is a modal itself or is modal's children but is not button close => return; tricky right :)
        if (callerElement === this.options.vmModal
            || this.options.vmModal.contains(callerElement)
            && !this.options.vmClose.contains(callerElement)
        ) return;

        this.vmWrapper.style.display = "none";
    };

    VanillaModal.prototype._setEvents = function () {
        var opt = this.options;
        util.addEvent(opt.vmOpen, 'click', this.open.bind(this));
        util.addEvent(opt.vmClose, 'click', this.close.bind(this));

        return this;
    };

    VanillaModal.prototype._decorateAttribute = function (attribute) {
        var parts = attribute.split('data-')[1].split('-');
        return parts[0] + parts[1].charAt(0).toUpperCase() + parts[1].substr(1).toLowerCase()
    };

    VanillaModal.prototype.init = function () {
        util.forEach([
            'data-vm-open',
            'data-vm-close',
            'data-vm-modal'
        ], function (attribute) {
            var element = util.getElementsByAttribute(attribute);
            if (!element.length) {
                throw Error('VanillaModal: Element with attribute "' + attribute + '" is not found.');
            }

            this.options[this._decorateAttribute(attribute)] = element[0]; // Currently only accept 1 element
        }.bind(this));

        // VanillaModal main events chain
        this._setEvents()
            ._appendToBody(this._createWrapper())
            ._addModalClass();
    };

    function init() {
        var modal = win.vanillaModal;
        modal && modal.loaded || (modal = win.vanillaModal = new VanillaModal());
        modal.init();
    }

    util.addEvent(doc, 'DOMContentLoaded', function () {
        init();
    });
})(window, document, modalUtility);