var modalUtility = {

    generateId: function () {
        return 'md-' + Date.now();
    },

    hasClass: function (el, className) {
        if (el.classList) {
            return el.classList.contains(className)
        } else {
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
        }
    },

    addClass: function (el, className) {
        if (el.classList) {
            el.classList.add(className)
        } else if (!this.hasClass(el, className)) {
            el.className += " " + className
        }
    },

    removeClass: function (el, className) {
        if (el.classList) {
            el.classList.remove(className);
        } else if (this.hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            el.className=el.className.replace(reg, ' ')
        }
    },

    css: function (el, str) {
        var st, LEN = "length";

        try {
            st	= el.style;

            if (arguments[LEN] > 1) {
                st.cssText = str;
            } else {
                str = st.cssText;
            }
        } catch (e) {
            str = "";
        }
        return str;
    },

    extend: function extend(obj) {
        this.forEach([].slice.call(arguments, 1), function (source) {
            if (source) {
                for (var prop in source) {
                    obj[prop] = source[prop];
                }
            }
        });
        return obj;
    },

    each: function () {
        for (var row in obj) Object.prototype.hasOwnProperty.call(obj, row) && callback.call(null, obj[row], row, obj)
    },

    addEvent: function (element, event, handler, d) {
        return (element.addEventListener ? (element.addEventListener(event, handler, d || false), true) : element.attachEvent ?
            (element.attachEvent("on" + event, handler), true) : false);
    },

    removeEvent: function (element, event, handler, d) {
        return (element.removeEventListener ? (element.removeEventListener(event, handler, d || false), true) : element.detachEvent ?
            (element.detachEvent("on" + event, handler), true) : false);
    },

    nativeForEach: Array.prototype.forEach,

    forEach: function forEach(array, iterator, context) {

        if (this.nativeForEach && array.forEach === this.nativeForEach) {
            array.forEach(iterator);
        } else {
            for (var i = 0, l = array.length; i < l; ++i) {
                if (iterator.call(context, array[i], i, array) === false) return;
            }
        }
    },

    getElementsByAttribute: function (attr, tag, value) {
        if (document.querySelectorAll) {
            var query = tag ? tag : '';
            query += '[' + attr;
            if (typeof value === 'undefined') {
                query += ']';
            } else {
                query += '="' + value + '"]';
            }
            return document.querySelectorAll(query);
        }

        var all = tag ? document.getElementsByTagName(tag) : document.all
            , matched = [];
        if (typeof value === 'undefined') {
            this.forEach(all, function (elem) {
                var $value = elem.getAttribute(attr);
                if ($value) {
                    matched.push(elem);
                }
            });

            return matched;
        }

        this.forEach(all, function (elem) {
            var $value = elem.getAttribute(attr);
            if ($value == value) {
                matched.push(elem);
            }
        });

        return matched;
    }

};
