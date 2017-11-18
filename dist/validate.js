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
                /* eslint-disable no-console */
                console.error(eve + ' is not a correct event type');
                /* eslint-disable no-console */
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
    // const trigger = el.trigger;
    var triggerArr = triggerAnalyse(trigger);

    return triggerArr;
});

var bind = (function (tri) {
  return trigger(tri);
});

var has = function has(obj, key) {
    return {}.hasOwnProperty.call(obj, key);
};

var hasValue = function hasValue(arr, key, value) {
    if (!isObj(arr) && !isArr(arr)) return false;

    if (isArr(arr)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var i = _step.value;

                if (i[key] === value) {
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
    }

    if (isObj(arr)) {
        if (arr[key] === value) return arr[key];
    }

    return false;
};

var check = function check(elm) {
    var elements = ['input', 'textarea'];
    var dom = null;

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = elements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var i = _step2.value;

            var els = elm.tagName.toLowerCase(i) === i ? elm : elm.querySelectorAll(i)[0];
            if (els) {
                dom = els;
                break;
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

    if (!dom) {
        /* eslint-disable no-console */
        console.error('event blur must has input or textarea');
        /* eslint-disable no-console */
    }

    return dom;
};

var isTelphone = function isTelphone(val) {
    var reg = /^1[34578]\d{9}$/;
    return reg.test(val);
};

var isEmail = function isEmail(val) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(val);
};

var splitKeys = function splitKeys(key, vNode) {
    var keyArr = key.split('.');
    var name = vNode;
    var str = 'that';
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = keyArr[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var i = _step3.value;

            name = name[i];
            str += '[\'' + i + '\']';
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

    return {
        funStr: str,
        value: name
    };
};

var isNum = function isNum(val) {
    return Object.prototype.toString.call(val) === '[object Number]';
};

var isStr = function isStr(val) {
    return Object.prototype.toString.call(val) === '[object String]';
};

var isObj = function isObj(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
};

var isArr = function isArr(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
};

var isFun = function isFun(val) {
    return Object.prototype.toString.call(val) === '[object Function]';
};



var getChineseLength = function getChineseLength(str) {
    if (str == null) return 0;
    if (typeof str !== 'string') {
        str += '';
    }
    var min = /\\x00/;
    var max = /\\xff/;
    var regrex = new RegExp('/[^' + min + '-' + max + ']/g');
    // const regrex = new RegExp(pattern);

    return str.replace(regrex, '01').length / 2;
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

var sysConfig = {
    dataName: '$$data-',
    reservedWord: [],
    configKey: ['text', 'trigger', 'config']
};

/*
 * @params lengthtype {String | Function} eng english-type chi chinese-type
 */
var userConfig = {
    lengthType: 'eng'
};

var setUserConfig = function setUserConfig(conf) {
    return Object.assign(userConfig, conf);
};

var covert = function covert(str) {
    var key = void 0;
    switch (str) {
        case 'minlength':
            key = 'min-length';
            break;
        default:
            break;
    }
    // key = str.replace(/([min|max|Min|Max])(length)/, '$1-$2');
    key = str.replace(/(min|max|Min|Max)(?:(float)|)(length)/, function () {
        var s = void 0;
        if (arguments.length <= 2 ? undefined : arguments[2]) {
            // float
            s = (arguments.length <= 1 ? undefined : arguments[1]) + '-' + (arguments.length <= 2 ? undefined : arguments[2]) + '-' + (arguments.length <= 3 ? undefined : arguments[3]);
        } else {
            s = (arguments.length <= 1 ? undefined : arguments[1]) + '-' + (arguments.length <= 3 ? undefined : arguments[3]);
        }
        return s;
    });
    return key;
};

var rule = (function (rule) {
    if (!isObj(rule)) return {};

    var errorText = void 0;
    // let trigger;
    var validate = rule.validate || {};
    var data = rule.data || {};
    var rules = {
        validate: {},
        data: {}
    };
    var add = function add(obj, objStr) {
        for (var i in obj) {
            if (!has(obj, i)) continue;
            var item = obj[i];
            var keyStr = objStr === 'data' ? sysConfig.dataName + i : i;
            errorText = item.text || '';
            // trigger = item.trigger || '';
            rules[objStr][keyStr] = {};
            for (var j in item) {
                if (!has(item, j)) continue;
                var value = item[j];
                var key = covert(j, objStr);

                if (sysConfig.configKey.indexOf(key) !== -1) {
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

    return rules;
});

var anlyse = (function (vNode, obj) {
    var attrs = obj || vNode.data.attrs;
    var validate = {};
    var text = attrs.text || '';

    // 最小值 必须是数字 大写为不包括边界值
    if (has(attrs, 'min')) {
        validate.min = {
            value: attrs.min,
            text: text
        };
    }

    if (has(attrs, 'Min')) {
        validate.Min = {
            value: attrs.Min,
            text: text
        };
    }

    // 最大值 必须是数字
    if (has(attrs, 'max')) {
        validate.max = {
            value: attrs.max,
            text: text
        };
    }

    if (has(attrs, 'Max')) {
        validate.Max = {
            value: attrs.Max,
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
        validate.required = {
            value: true,
            text: text
        };
    }

    // 数字的可以考虑合在一起
    // 数字 可以是字符串数字
    // int or float
    if (has(attrs, 'number')) {
        validate.number = {
            value: attrs.number || 'int',
            text: text
        };
    }

    // 数字 不能是字符串数字
    if (has(attrs, 'Number')) {
        validate.Number = {
            value: attrs.Number || 'int',
            text: text
        };
    }

    // 正数 含0
    if (has(attrs, 'positive')) {
        validate.positive = true;
    }

    // 正数 不含0
    if (has(attrs, 'Positive')) {
        validate.Positive = true;
    }

    // 负数 含0
    if (has(attrs, 'negative')) {
        validate.negative = true;
    }

    // 负数 不含0
    if (has(attrs, 'Negative')) {
        validate.Negative = true;
    }

    // email
    if (has(attrs, 'email')) {
        validate.email = true;
    }

    // phone
    if (has(attrs, 'phone')) {
        validate.phone = true;
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
var config = userConfig;

var getLength = function getLength(val) {
    var type = config.lengthType;
    var len = 0;

    if (isStr(type)) {
        switch (type) {
            case 'eng':
                len = val.length;
                break;
            case 'chi':
                len = getChineseLength(val);
                break;
            default:
                break;
        }
    } else if (isFun(type)) {
        len = type(val);
    }

    return len;
};

var getFloatLength = function getFloatLength(val) {
    var reg = /.*?[.](\d*)/;
    var floatNum = val.match(reg);
    var len = 0;
    if (floatNum && floatNum.length && floatNum[1]) {
        len = floatNum[1].length;
    }

    return len;
};

var isNaN = Number.isNaN;


var judge = (function (validate, value, item, $parent, Vue) {
    var type = void 0;
    var val = void 0;
    var length = void 0;
    var floatLen = void 0;
    var key = void 0;
    var target = getTarget(item);
    var errors = {
        type: '',
        detail: []
    };
    var text = validate.text || '';
    Object.assign(config, Vue.config);
    Object.assign(config, validate.config);
    var cal = function cal(vals) {
        if (isFun(vals.value)) {
            return vals.value.call($parent);
        }
        return vals.value;
    };

    var Error =
    // errorTpl = {
    //    key: '', // error key like min max
    //    value: '', // key value
    //    actual: '', // actual value
    // };

    /* eslint-disable no-shadow */
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

    if (has(validate, 'min-float-length') || has(validate, 'max-float-length') || has(validate, 'Min-float-length') || has(validate, 'Max-float-length')) {
        floatLen = getFloatLength(value);
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

    key = 'min';
    if (has(validate, key) && val <= cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), value, target));
    }

    key = 'max';
    if (has(validate, key) && val >= cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), value, target));
    }

    key = 'Min';
    if (has(validate, key) && val < cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), value, target));
    }

    key = 'Max';
    if (has(validate, key) && val > cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), value, target));
    }

    key = 'min-length';
    if (has(validate, key) && length <= cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), length, target));
    }

    key = 'max-length';
    if (has(validate, key) && length >= cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), length, target));
    }

    key = 'Min-length';
    if (has(validate, key) && length < cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), length, target));
    }

    key = 'Max-length';
    if (has(validate, key) && length > cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), length, target));
    }

    key = 'min-float-length';
    if (has(validate, key) && floatLen <= cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), floatLen, target));
    }

    key = 'max-float-length';
    if (has(validate, key) && floatLen >= cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), floatLen, target));
    }

    key = 'Min-float-length';
    if (has(validate, key) && floatLen < cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), floatLen, target));
    }

    key = 'Max-float-length';
    if (has(validate, key) && floatLen > cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), floatLen, target));
    }

    if (has(validate, 'required') && (val === undefined || val === null || val === '' || isNaN(val))) {
        errors.detail.push(new Error('required', '', value, target));
    }

    key = 'phone';
    if (has(validate, key) && !isTelphone(value)) {
        errors.detail.push(new Error(key, '', value, target));
    }

    key = 'email';
    if (has(validate, key) && !isEmail(value)) {
        errors.detail.push(new Error(key, '', value, target));
    }

    if (validate.number === 'int') {
        if (isNaN(parseInt(val, 10))) {
            errors.detail.push(new Error('number', '', val, target));
        }
    } else if (validate.number === 'float') {
        if (isNaN(parseFloat(val, 10))) {
            errors.detail.push(new Error('number', '', val, target));
        }
    }

    if (validate.Number === 'int') {
        if (isInt(val)) {
            errors.detail.push(new Error('Number', '', val, target));
        }
    } else if (validate.Number === 'float') {
        if (isFloat(val)) {
            errors.detail.push(new Error('Number', '', val, target));
        }
    }

    return errors;
});

var globalId = 0;

var finds = function finds(items) {
    return function (name) {
        if (!name) return false;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var i = _step.value;

                if (i.name === name) {
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

        return false;
    };
};

var Field = function () {
    // item: Array;
    // el: Vue;
    // rule: Object;
    // find: Function;

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
            var _this = this;

            var find = function find(component) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = component[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var i = _step2.value;

                        if (i.children && i.children.length) find(i.children);
                        if (!i.data) continue;
                        var dir = i.data.directives || [];
                        var name = hasValue(dir, 'name', 'validate');
                        var model = hasValue(dir, 'name', 'model');
                        var item = {};

                        if (name || i.data.attrs && has(i.data.attrs, 'validate-name')) {
                            item.com = i;
                            item.name = i.data.attrs['validate-name'];
                            item.showName = i.data.attrs['validate-name'];
                            item.trigger = bind(i.data.attrs.trigger || _this.rule.validate[item.name].trigger);
                            item.validateContext = anlyse(i);
                        }

                        if (model) {
                            item.model = {
                                value: model.value,
                                expression: model.expression
                            };
                        }

                        if (item.com) {
                            item.validate = _this.getValidate(item, 'validate');
                            item.id = globalId;
                            globalId += 1;
                            _this.item.push(item);
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
            };

            find(components);
        }
    }, {
        key: 'dataInit',
        value: function dataInit() {
            var datas = this.rule.data;
            for (var i in datas) {
                if (!has(datas, i)) continue;
                var item = {};
                var value = datas[i];
                var name = i.replace(sysConfig.dataName, '');
                item.name = i;
                item.showName = name;
                item.trigger = bind(value.trigger);
                item.model = {
                    value: '',
                    expression: name
                };
                // 用于target选择不报错
                item.com = '';
                item.validate = this.getValidate(item, 'data');
                this.item.push(item);
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

                            if (j.eve === 'change') {
                                this.addWatcher(i, j);
                            }
                            if (j.eve === 'blur' || j.eve === 'input') {
                                this.addInputWatcher(i, j);
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
    }, {
        key: 'addWatcher',
        value: function addWatcher(item, trigger) {
            // change 事件
            // item 要检验的对象
            var $parent = this.config.$parent || this.el.$parent,
                element = this.find(trigger.el) || item;

            $parent.$watch(element.model.expression, function () {
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
            if (blurElm) {
                blurElm.addEventListener(trigger.eve, function () {
                    item.validate(item);
                });
            }
        }
    }, {
        key: 'getValidate',
        value: function getValidate(items, key) {
            var _this2 = this;

            var validate = items.validateContext || {};
            var $parent = this.config.$parent || this.el.$parent;
            // const { $parent } = this.el;
            validate = Object.assign(this.rule[key][items.name] || {}, validate);
            return function (item) {
                var value = item.model ? splitKeys(item.model.expression, $parent.$data).value : item.com.elm.value;
                var error = judge(validate, value, item, $parent, _this2);
                var name = item.showName;

                if (error.detail.length > 0) {
                    $parent.$set($parent.errors, name, true);
                    $parent.$set($parent.errors, name + 'Error', error.detail[0].text);
                } else {
                    $parent.$set($parent.errors, name, false);
                    $parent.$set($parent.errors, name + 'Error', '');
                }
                console.log(error);
            };
        }
    }, {
        key: 'validateAll',
        value: function validateAll() {
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this.item[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var i = _step5.value;

                    i.validate();
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
                // 'length-type': 'eng'
            },
            field: '',
            rule: ''
        };
    },

    methods: {
        configInit: function configInit(attrs) {
            var _attrs$config = attrs.config,
                config = _attrs$config === undefined ? {} : _attrs$config,
                _attrs$lengthType = attrs.lengthType,
                lengthType = _attrs$lengthType === undefined ? 'eng' : _attrs$lengthType,
                parent = attrs.parent;

            config.lengthType = config.lengthType || lengthType;
            config.$parent = parent || this.$vnode.context;
            this.config = config;
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
        // const attrs = this.$vnode.data.attrs;

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

/* eslint-disable */
var init = function init(el) {
    var name = el.getAttribute('validate-name');
};

var directive = (function (Vue) {
    Vue.directive('validate', {
        bind: function bind(el, binding, vnode, oldVnode) {
            var data = init(el);
            // console.log(el);
            // console.log(vnode.context.$validator);
            // v-model el.__vue__.value;
            // v-model vnode.data.directives[0]
            // el.addEventListener('blur', function (e) {
            //    console.log(e.target.value);
            // });
            // console.log(el.__vue__);
            // console.log(vnode.data.directives);
        },
        componentUpdated: function componentUpdated(el) {
            // console.log(2, el);
        },
        update: function update(el) {
            // console.log(1, el);
        }
    });
});
/* eslint-disable */

var _class = function _class() {
    classCallCheck(this, _class);

    this.init = 1;
};

var mixin = (function (Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var mixin = {};
    // console.log(Vue.util);

    mixin.beforeCreate = function () {
        // children中有validate-form才添加
        this.$validator = new _class(this);
        // if (! this.$options.computed) {
        //    this.$options.computed = {};
        // }

        // this.$options.computed['errors'] = function errorBagGetter () {
        //    return new Set();
        //    return this.$validator.errors;
        // };
    };

    mixin.created = function () {
        // console.log(this.$options.name);
    };

    mixin.beforeDestory = function () {};

    Vue.mixin(mixin);
});
/* eslint-disable */

function plugin(Vue, conf) {
    if (plugin.installed) {
        /* eslint-disable no-console */
        console.warn('installed');
        /* eslint-disable no-console */
        return;
    }
    setUserConfig(conf);
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
