(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

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
    var trigger = el.trigger;
    var triggerArr = triggerAnalyse(trigger);

    return triggerArr;
});

var bind = (function (el) {
    return trigger(el);
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Field = function () {
    function Field(components) {
        _classCallCheck(this, Field);

        this.item = [];
        this.init(components);

        this.events();
    }

    _createClass(Field, [{
        key: 'init',
        value: function init(components) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = components[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var i = _step.value;

                    if (!i.data) continue;
                    var dir = i.data.directives;
                    var item = {};
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = dir[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var j = _step2.value;

                            if (j.name === 'validate') {
                                item.com = i;
                                item.trigger = bind(i.data.attrs);
                                item.name = i.data.attrs['validate-name'];

                                console.log(item);
                            }

                            if (j.name === 'model') {
                                item.model = {
                                    value: j.value,
                                    expression: j.expression
                                };
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    if (item.com) {
                        this.item.push(item);
                    }
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
        }
    }, {
        key: 'events',
        value: function events() {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.item[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var i = _step3.value;
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = i.trigger[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var j = _step4.value;

                            if (j.eve === 'blur') {
                                if (!j.el) {
                                    console.log(i.com.elm);
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }]);

    return Field;
}();

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
        return {
            filed: ''
        };
    },
    mounted: function mounted() {
        var components = this.$slots.default;
        this.field = new Field(components);
        console.log(components);
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

var init = function init(el) {
    var name = el.getAttribute('validate-name');
};

function plugin(Vue) {
    if (plugin.installed) {
        console.log('installed');
        return;
    }
    //console.log(Vue.options);
    //console.log(Vue.config);
    Vue.directive('validate', {
        bind: function bind$$1(el, binding, vnode, oldVnode) {
            var data = init(el);
            //bind(el);
            console.log(el);
            // v-model el.__vue__.value;
            // v-model vnode.data.directives[0]
            //el.addEventListener('blur', function (e) {
            //    console.log(e.target.value);
            //});
            //console.log(el.__vue__);
            //console.log(vnode.data.directives);
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

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

module.exports = plugin;

})));
//# sourceMappingURL=validate.js.map
