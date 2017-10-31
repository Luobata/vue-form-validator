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

var check = function check(elm) {
    var elements = ['input', 'textarea'];
    var dom = null;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i = _step.value;

            var els = elm.tagName.toLowerCase(i) === i ? elm : elm.querySelectorAll(i)[0];
            if (els) {
                dom = els;
                break;
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

    if (!dom) {
        console.error('event blur must has input or textarea');
    }

    return dom;
};

var isNum = function isNum(val) {
    return Object.prototype.toString.call(val) === '[object Number]';
};

var has = function has(obj, key) {
    return obj.hasOwnProperty(key);
};

var isInt = function isInt(val) {
    if (!isNum(val)) {
        return false;
    }

    return (/^-?\d+$/.test(val)
    );
};

var isFloat = function isFloat(val) {
    if (!isNum(val)) {
        return false;
    }

    return (/^(-?\d+)(\.\d+)?$/.test(val)
    );
};

var anlyse = (function (vNode) {
    var attrs = vNode.data.attrs;
    var validate = {};

    // 最小值 必须是数字 大写为不包括边界值
    if (has(attrs, 'min')) {
        validate['min'] = attrs['min'];
    }

    if (has(attrs, 'Min')) {
        validate['Min'] = attrs['Min'];
    }

    // 最大值 必须是数字
    if (has(attrs, 'max')) {
        validate['max'] = attrs['max'];
    }

    if (has(attrs, 'Max')) {
        validate['Max'] = attrs['Max'];
    }

    // 最小长度 必须是数字
    if (has(attrs, 'minlength')) {
        validate['minlength'] = attrs['minlength'];
    }

    // 最大长度 必须是数字
    if (has(attrs, 'maxlength')) {
        validate['maxlength'] = attrs['maxlength'];
    }

    if (has(attrs, 'Minlength')) {
        validate['Minlength'] = attrs['Minlength'];
    }

    if (has(attrs, 'Maxlength')) {
        validate['Maxlength'] = attrs['Maxlength'];
    }

    // 必填
    if (has(attrs, 'required')) {
        validate['required'] = true;
    }

    // 数字 可以是字符串数字
    // int or float
    if (has(attrs, 'number')) {
        validate['number'] = attrs['number'] || 'int';
    }

    // 数字 不能是字符串数字
    if (has(attrs, 'Number')) {
        validate['Number'] = attrs['Number'] || 'int';
    }

    if (has(attrs, 'maxfloatlength')) {
        validate['maxfloatlength'] = attrs['maxfloatlength'];
    }

    if (has(attrs, 'minfloatlength')) {
        validate['minfloatlength'] = attrs['minfloatlength'];
    }

    if (has(attrs, 'Maxfloatlength')) {
        validate['Maxfloatlength'] = attrs['Maxfloatlength'];
    }

    if (has(attrs, 'Minfloatlength')) {
        validate['Minfloatlength'] = attrs['Minfloatlength'];
    }

    return validate;
});

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Error =
//errorTpl = {
//    key: '', // error key like min max
//    value: '', // key value
//    actual: '', // actual value
//};

function Error(key, value, actual, target) {
    _classCallCheck$1(this, Error);

    this.key = key;
    this.value = value;
    this.actual = actual;
    this.target = target;
};



var getTarget = function getTarget(item) {
    return item.com.elm;
};

var getLength = function getLength() {};

var judge = (function (validate, value, item) {
    var type = void 0;
    var val = void 0;
    var length = void 0;
    var target = getTarget(item);
    var errors = {
        type: '',
        detail: []
    };

    if (has(validate, 'min') || has(validate, 'max') || has(validate, 'Min') || has(validate, 'Max')) {
        type = 'number';
    }

    if (has(validate, 'minlength') || has(validate, 'maxlength') || has(validate, 'Minlength') || has(validate, 'Maxlength')) {
        length = getLength(value);
    }

    switch (type) {
        case 'number':
            val = parseFloat(value, 10);
            if (value !== '' && value !== undefined && isNaN(val)) {
                errors.type = 'wrong type';
            }
            break;
        default:
            val = value;
    }

    if (errors.type) {
        return errors;
    }

    if (has(validate, 'min') && val <= validate['min']) {
        errors.detail.push(new Error('min', validate['min'], value, target));
    }

    if (has(validate, 'max') && val >= validate['max']) {
        errors.detail.push(new Error('max', validate['max'], value, target));
    }

    if (has(validate, 'Min') && val < validate['Min']) {
        errors.detail.push(new Error('Min', validate['Min'], value, target));
    }

    if (has(validate, 'Max') && val > validate['Max']) {
        errors.detail.push(new Error('Max', validate['Max'], value, target));
    }

    if (has(validate, 'minlength') && length <= validate['minlength']) {
        errors.detail.push(new Error('minlength', validate['minlength'], length, target));
    }

    if (has(validate, 'maxlength') && length >= validate['maxlength']) {
        errors.detail.push(new Error('maxlength', validate['maxlength'], length, target));
    }

    if (has(validate, 'Minlength') && length < validate['Minlength']) {
        errors.detail.push(new Error('Minlength', validate['Minlength'], length, target));
    }

    if (has(validate, 'Maxlength') && length > validate['Maxlength']) {
        errors.detail.push(new Error('Maxlength', validate['Maxlength'], length, target));
    }

    if (has(validate, 'required') && (val === undefined || val === null || val === '')) {
        errors.detail.push(new Error('require', '', value, target));
    }

    if (attrs('number') === 'int') {
        if (isNaN(parseInt(val, 10))) {
            errors.detail.push(new Error('number', '', val, target));
        }
    } else if (attrs['number'] === 'float') {
        if (isNaN(parseFloat(val, 10))) {
            errors.detail.push(new Error('number', '', val, target));
        }
    }

    if (attrs('Number') === 'int') {
        if (isInt(val)) {
            errors.detail.push(new Error('Number', '', val, target));
        }
    } else if (attrs['Number'] === 'float') {
        if (isFloat(val)) {
            errors.detail.push(new Error('Number', '', val, target));
        }
    }

    return errors;
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var find = function find(items) {
    return function (name) {
        if (!name) return undefined;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var i = _step.value;

                if (i.name == name) {
                    return i;
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
    };
};

var Field = function () {
    function Field(components, el) {
        _classCallCheck(this, Field);

        this.item = [];
        this.el = el;
        this.config = el.config;
        this.init(components);
        find = find(this.items);

        this.events();
    }

    _createClass(Field, [{
        key: 'init',
        value: function init(components) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = components[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var i = _step2.value;

                    if (!i.data) continue;
                    var dir = i.data.directives;
                    var item = {};
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = dir[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var j = _step3.value;


                            if (j.name === 'validate') {
                                item.com = i;
                                item.trigger = bind(i.data.attrs);
                                item.validateContext = anlyse(i);
                                item.name = i.data.attrs['validate-name'];
                            }

                            if (j.name === 'model') {
                                item.model = {
                                    value: j.value,
                                    expression: j.expression
                                };
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

                    if (item.com) {
                        item.validate = this.getValidate(item);
                        this.item.push(item);
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
        }
    }, {
        key: 'events',
        value: function events() {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.item[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var i = _step4.value;
                    var _iteratorNormalCompletion5 = true;
                    var _didIteratorError5 = false;
                    var _iteratorError5 = undefined;

                    try {
                        for (var _iterator5 = i.trigger[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                            var j = _step5.value;

                            if (j.eve === 'change') {
                                this.addWatcher(i, j.el);
                            }
                            if (j.eve === 'blur' || j.eve === 'input') {
                                if (!j.el) {
                                    this.addInputWatcher(i, j.eve, j.el);
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError5 = true;
                        _iteratorError5 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                _iterator5.return();
                            }
                        } finally {
                            if (_didIteratorError5) {
                                throw _iteratorError5;
                            }
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
    }, {
        key: 'addWatcher',
        value: function addWatcher(item) {
            // change 事件
            var $parent = this.el.$parent;
            $parent.$watch(item.model.expression, item.validate);
        }
    }, {
        key: 'addInputWatcher',
        value: function addInputWatcher(item, eve, el) {
            // blur 事件触法条件 input textarea 或者contenteditable元素
            var element = find(el) || item;
            var elm = element.com.elm;
            var blurElm = check(elm);
            if (blurElm) {
                blurElm.addEventListener(eve, function (e) {
                    item.validate(this.value);
                });
            }
        }
    }, {
        key: 'getValidate',
        value: function getValidate(item) {
            var validate = item.validateContext;
            return function (value) {
                var error = judge(validate, value, item);
                console.log(error);
            };
        }
    }, {
        key: 'validateAll',
        value: function validateAll() {
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this.item[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var i = _step6.value;

                    i.validate();
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }
        }
    }, {
        key: 'validateItem',
        value: function validateItem(name) {
            var item = find(name);
            if (item) item.validate();
        }
    }]);

    return Field;
}();

var __vue_module__ = {
    name: 'validate-form',
    data: function data() {
        return {
            config: {
                'length-type': 'eng'
            },
            field: ''
        };
    },

    methods: {
        configInit: function configInit() {
            var attrs = this.$vnode.data.attrs;
            var lengthType = attrs['length-type'];
            this.config['length-type'] = lengthType || this.config['length-type'];
        },
        validateAll: function validateAll() {
            this.field.validateAll();
        }
    },
    mounted: function mounted() {
        var components = this.$slots.default;
        this.configInit();
        this.field = new Field(components, this);
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

var directive = (function (Vue) {
    Vue.directive('validate', {
        bind: function bind(el, binding, vnode, oldVnode) {
            var data = init(el);
            console.log(el);
            //console.log(vnode.context.$validator);
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
});

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class(el) {
    _classCallCheck$3(this, _class);
};

var mixin = (function (Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var mixin = {};
    console.log(Vue.util);

    mixin.beforeCreate = function () {
        // children中有validate-form才添加
        this.$validator = new _class(this);
        //if (! this.$options.computed) {
        //    this.$options.computed = {};
        //}

        //this.$options.computed['errors'] = function errorBagGetter () {
        //    return new Set();
        //    return this.$validator.errors;
        //};
    };

    mixin.created = function () {
        // console.log(this.$options.name);
    };

    mixin.beforeDestory = function () {};

    Vue.mixin(mixin);
});

function plugin(Vue) {
    if (plugin.installed) {
        console.log('installed');
        return;
    }
    //console.log(Vue.options);
    //console.log(Vue.config);
    directive(Vue);
    mixin(Vue);
    Vue.component(__$__vue_module__.name, __$__vue_module__);
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

module.exports = plugin;

})));
//# sourceMappingURL=validate.js.map
