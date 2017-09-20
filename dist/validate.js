(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var __vue_module__ = {
    name: 'validate-form',
    //directives: {
    //    validate: {
    //        inserted: function (el) {
    //            console.log(el);
    //        }
    //    }
    //},
    data: function data() {
        return {};
    }
};

(function () {
    if (typeof document !== 'undefined') {
        var head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style'),
            css = "";style.type = 'text/css';if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }head.appendChild(style);
    }
})();


var __$__vue_module__ = Object.assign(__vue_module__, { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_vm._t("default")], 2);
    }, staticRenderFns: [] });
__$__vue_module__.prototype = __vue_module__.prototype;

var eventType = ['blur', 'change', 'input'];

var triggerAnalyse = function triggerAnalyse(triggerStr) {
    if (!triggerStr) return [];

    var triggerArr = triggerStr.split(';');
    var arr = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = triggerArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i = _step.value;

            var rurl = /(?:\$(.*)\.|)(.*)$/;
            var regArr = rurl.exec(i);
            var el = regArr[1];
            var eve = regArr[2];

            if (eventType.indexOf(eve) === -1) {
                console.error(eve + ' is not a correct event type');
                continue;
            }
            arr.push({ el: el, eve: eve });
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return arr;
};

var trigger = (function (el) {
    var trigger = el.getAttribute('trigger');
    var triggerArr = triggerAnalyse(trigger);
    console.log(triggerArr);
});

var _bind = (function (el) {
    trigger(el);
});

var init = function init(el) {
    var name = el.getAttribute('validate-name');
};

var validate = {
    install: function install(Vue) {
        Vue.directive('validate', {
            //params: ['validate-name']
            bind: function bind(el, binding, vnode, oldVnode) {
                var data = init(el);
                _bind(el);
                // v-model el.__vue__.value;
                el.addEventListener('blur', function (e) {
                    console.log(e.target.value);
                });
                console.log(el.__vue__);
                //console.log(el.__vue__.value);
            },
            componentUpdated: function componentUpdated(el) {
                // console.log(2, el);
            },
            update: function update(el) {
                // console.log(1, el);
            }
        });
        Vue.component(__$__vue_module__.name, __$__vue_module__);
    }
};

var installed = false;

var install = function install(Vue) {
    if (installed) {
        console.log('installed already');
        return;
    }

    validate.install(Vue);
    installed = true;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports = {
    install: install
};

})));
//# sourceMappingURL=validate.js.map
