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

var trigger = (function (trigger) {
    //const trigger = el.trigger;
    var triggerArr = triggerAnalyse(trigger);

    return triggerArr;
});

var bind = (function (tri) {
    return trigger(tri);
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



var isObj = function isObj(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
};

var isFun = function isFun(val) {
    return Object.prototype.toString.call(val) === '[object Function]';
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

var covert = function covert(str) {
    var key = void 0;
    switch (str) {
        case 'minlength':
            key = 'min-length';
    }
    key = str.replace(/([min|max|Min|Max])(length)/, '$1-$2');
    return key;
};

var rule = (function (rule) {
    if (!isObj(rule)) return {};

    var errorText = void 0;
    var validate = rule.validate || {};
    var data = rule.data || {};
    var trigger = void 0;
    var rules = {
        validate: {},
        data: {}
    };
    var add = function add(obj, objStr) {
        for (var i in obj) {
            var item = obj[i];
            var keyStr = objStr === 'data' ? '$$data-' + i : i;
            errorText = item.text || '';
            trigger = item.trigger || '';
            rules[objStr][keyStr] = {};
            for (var j in item) {
                var value = item[j];
                var key = covert(j, objStr);

                if (key === 'text' || key === 'trigger') {
                    rules[objStr][keyStr][key] = value;
                    continue;
                }

                if (isObj(value)) {
                    rules[objStr][keyStr][key] = value;
                } else {
                    rules[objStr][keyStr][key] = {
                        value: value,
                        text: errorText
                    };
                }
            }
        }
    };

    add(validate, 'validate');
    add(data, 'data');
    console.log(rules);

    return rules;
});

var anlyse = (function (vNode, obj) {
    var attrs = obj || vNode.data.attrs;
    var validate = {};
    var text = attrs['text'] || '';

    // 最小值 必须是数字 大写为不包括边界值
    if (has(attrs, 'min')) {
        validate['min'] = {
            value: attrs['min'],
            text: text
        };
    }

    if (has(attrs, 'Min')) {
        validate['Min'] = {
            value: attrs['Min'],
            text: text
        };
    }

    // 最大值 必须是数字
    if (has(attrs, 'max')) {
        validate['max'] = {
            value: attrs['max'],
            text: text
        };
    }

    if (has(attrs, 'Max')) {
        validate['Max'] = {
            value: attrs['Max'],
            text: text
        };
    }

    // 最小长度 必须是数字
    if (has(attrs, 'min-length')) {
        validate['min-length'] = {
            value: attrs['min-length'],
            text: text
        };
    }

    // 最大长度 必须是数字
    if (has(attrs, 'max-length')) {
        validate['max-length'] = {
            value: attrs['max-length'],
            text: text
        };
    }

    if (has(attrs, 'Min-length')) {
        validate['Min-length'] = {
            value: attrs['Min-length'],
            text: text
        };
    }

    if (has(attrs, 'Max-length')) {
        validate['Max-length'] = {
            value: attrs['Max-length'],
            text: text
        };
    }

    // 必填
    if (has(attrs, 'required')) {
        validate['required'] = {
            value: true,
            text: text
        };
    }

    // 数字 可以是字符串数字
    // int or float
    if (has(attrs, 'number')) {
        validate['number'] = {
            value: attrs['number'] || 'int',
            text: text
        };
    }

    // 数字 不能是字符串数字
    if (has(attrs, 'Number')) {
        validate['Number'] = {
            value: attrs['Number'] || 'int',
            text: text
        };
    }

    if (has(attrs, 'max-float-length')) {
        validate['max-float-length'] = {
            value: attrs['max-float-length'],
            text: text
        };
    }

    if (has(attrs, 'min-float-length')) {
        validate['min-float-length'] = {
            value: attrs['min-float-length'],
            text: text
        };
    }

    if (has(attrs, 'Max-float-length')) {
        validate['Max-float-length'] = {
            value: attrs['Max-float-length'],
            text: text
        };
    }

    if (has(attrs, 'Min-float-length')) {
        validate['Min-float-length'] = {
            value: attrs['Min-float-length'],
            text: text
        };
    }

    return validate;
});

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var getTarget = function getTarget(item) {
    return item.com.elm;
};

var getLength = function getLength() {};

var judge = (function (validate, value, item, $parent) {
    var type = void 0;
    var val = void 0;
    var length = void 0;
    var target = getTarget(item);
    var errors = {
        type: '',
        detail: []
    };
    var text = validate.text || '';
    var cal = function cal(val) {
        if (isFun(val.value)) {
            return val.value.call($parent);
        } else {
            return val.value;
        }
    };

    var Error =
    //errorTpl = {
    //    key: '', // error key like min max
    //    value: '', // key value
    //    actual: '', // actual value
    //};

    function Error(key, value, actual, target) {
        classCallCheck(this, Error);

        this.key = key;
        this.value = value;
        this.actual = actual;
        this.target = target;
        this.text = validate[key].text || text;
    };

    

    if (has(validate, 'min') || has(validate, 'max') || has(validate, 'Min') || has(validate, 'Max')) {
        type = 'number';
    }

    if (has(validate, 'min-length') || has(validate, 'max-length') || has(validate, 'Min-length') || has(validate, 'Max-length')) {
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

    if (has(validate, 'min') && val <= cal(validate['min'])) {
        errors.detail.push(new Error('min', cal(validate['min']), value, target));
    }

    if (has(validate, 'max') && val >= cal(validate['max'])) {
        errors.detail.push(new Error('max', cal(validate['max']), value, target));
    }

    if (has(validate, 'Min') && val < cal(validate['Min'])) {
        errors.detail.push(new Error('Min', cal(validate['Min']), value, target));
    }

    if (has(validate, 'Max') && val > cal(validate['Max'])) {
        errors.detail.push(new Error('Max', cal(validate['Max']), value, target));
    }

    if (has(validate, 'min-length') && length <= cal(validate['min-length'])) {
        errors.detail.push(new Error('min-length', cal(validate['min-length']), length, target));
    }

    if (has(validate, 'max-length') && length >= cal(validate['max-length'])) {
        errors.detail.push(new Error('max-length', cal(validate['max-length']), length, target));
    }

    if (has(validate, 'Min-length') && length < cal(validate['Min-length'])) {
        errors.detail.push(new Error('Min-length', cal(validate['Min-length']), length, target));
    }

    if (has(validate, 'Max-length') && length > cal(validate['Max-length'])) {
        errors.detail.push(new Error('Max-length', cal(validate['Max-length']), length, target));
    }

    if (has(validate, 'required') && (val === undefined || val === null || val === '' || isNaN(val))) {
        errors.detail.push(new Error('required', '', value, target));
    }

    if (validate['number'] === 'int') {
        if (isNaN(parseInt(val, 10))) {
            errors.detail.push(new Error('number', '', val, target));
        }
    } else if (validate['number'] === 'float') {
        if (isNaN(parseFloat(val, 10))) {
            errors.detail.push(new Error('number', '', val, target));
        }
    }

    if (validate['Number'] === 'int') {
        if (isInt(val)) {
            errors.detail.push(new Error('Number', '', val, target));
        }
    } else if (validate['Number'] === 'float') {
        if (isFloat(val)) {
            errors.detail.push(new Error('Number', '', val, target));
        }
    }

    return errors;
});

var finds = function finds(items) {
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
    //item: Array;
    //el: Vue;
    //rule: Object;
    //find: Function;

    function Field(components, el) {
        classCallCheck(this, Field);

        this.item = [];
        this.el = el;
        this.config = el.config;
        this.rule = rule(el.rule);
        this.init(components);
        this.dataInit();
        this.find = finds(this.item);

        this.events();
    }

    createClass(Field, [{
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
                                item.name = i.data.attrs['validate-name'];
                                //item.trigger = Object.assign(this.rule['validate'][item.name] || {}, bind(i.data.attrs));
                                item.trigger = bind(i.data.attrs.trigger || this.rule['validate'][item.name].trigger);
                                console.log(item.trigger);
                                item.validateContext = anlyse(i);
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
                        item.validate = this.getValidate(item, 'validate');
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
        key: 'dataInit',
        value: function dataInit() {
            var datas = this.rule.data;
            for (var i in datas) {
                var item = {};
                var value = datas[i];
                item.name = i;
                item.trigger = bind(value.trigger);
                //item.validateContext = anlyse('', value);
                item.model = {
                    value: '',
                    expression: i.replace('$$data-', '')
                };
                // 用于target选择不报错
                item.com = '';
                item.validate = this.getValidate(item, 'data');
                this.item.push(item);
                console.log(item);
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
                                this.addWatcher(i, j);
                            }
                            if (j.eve === 'blur' || j.eve === 'input') {
                                this.addInputWatcher(i, j);
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
        value: function addWatcher(item, trigger) {
            // change 事件
            // item 要检验的对象
            // trigger 触法的对象
            var $parent = this.el.$parent;
            var element = this.find(trigger.el) || item;
            $parent.$watch(element.model.expression, function (val) {
                item.validate(item);
            });
        }
    }, {
        key: 'addInputWatcher',
        value: function addInputWatcher(item, trigger) {
            // blur 事件触法条件 input textarea 或者contenteditable元素
            var element = this.find(trigger.el) || item;
            var elm = element.com.elm;
            var blurElm = check(elm);
            var $parent = this.el.$parent;
            if (blurElm) {
                blurElm.addEventListener(trigger.eve, function (e) {
                    item.validate(item);
                });
            }
        }
    }, {
        key: 'getValidate',
        value: function getValidate(item, key) {
            var validate = item.validateContext || {};
            var $parent = this.el.$parent;
            validate = Object.assign(this.rule[key][item.name] || {}, validate);
            console.log(validate);
            return function (item) {
                var value = item.model ? $parent.$data[item.model.expression] : item.com.elm.value;
                var error = judge(validate, value, item, $parent);
                if (error.detail.length > 0) {
                    $parent.$set($parent.errors, item.name, true);
                    $parent.$set($parent.errors, item.name + 'Error', error.detail[0].text);
                } else {
                    $parent.$set($parent.errors, item.name, false);
                    $parent.$set($parent.errors, item.name + 'Error', '');
                }
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
            var item = this.find(name);
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
            field: '',
            rule: ''
        };
    },

    methods: {
        configInit: function configInit(attrs) {
            var lengthType = attrs['length-type'];
            this.config['length-type'] = lengthType || this.config['length-type'];
        },
        ruleInit: function ruleInit(attrs) {
            var rule = attrs.rule;
            this.rule = rule;
        },
        validateAll: function validateAll() {
            this.field.validateAll();
        }
    },
    mounted: function mounted() {
        var components = this.$slots.default;
        var attrs = this.$vnode.data.attrs;
        this.configInit(attrs);
        this.ruleInit(attrs);
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
            //console.log(el);
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

var _class = function _class(el) {
    classCallCheck(this, _class);
};

var mixin = (function (Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var mixin = {};
    //console.log(Vue.util);

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
