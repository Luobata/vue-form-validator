(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var __vue_module__ = {
    name: 'validate-form',
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
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div');
    }, staticRenderFns: [] });
__$__vue_module__.prototype = __vue_module__.prototype;

var validate = {
    install: function install(Vue) {
        Vue.directive('validate', {});
        //Vue.component(validate.name, validate);
        Vue.component('validate-form', __$__vue_module__);
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
