import bind from './bind.js';
import rule from './rule.js';
import anlyse from './anlyse.js';
import judge from './judge.js';
import Watcher from './watcher.js';
import { check } from './util/index.js';

let finds = (items) => {
    return (name) => {
        if (!name) return undefined;

        for (let i of items) {
            if (i.name == name) {
                return i;
            }
        }
    }
};

export default class Field {
    //item: Array;
    //el: Vue;
    //rule: Object;
    //find: Function;

    constructor(components, el) {
        this.item = [];
        this.el = el;
        this.config = el.config;
        this.rule = rule(el.rule);
        this.init(components);
        this.dataInit();
        this.find = finds(this.item);

        this.events();
    };

    init(components) {
        for (let i of components) {
            if (!i.data) continue;
            const dir = i.data.directives;
            const item = {};
            for (let j of dir) {

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
            if (item.com) {
                item.validate = this.getValidate(item, 'validate');
                this.item.push(item);
            }
        }
    };

    dataInit () {
        const datas = this.rule.data;
        for (let i in datas) {
            const item = {};
            const value = datas[i];
            item.name = i;
            item.trigger = bind(value);
            //item.validateContext = anlyse('', value);
            item.model = {
                value: '',
                expression: i.replace('$$data-', ''),
            };
            // 用于target选择不报错
            item.com = '';
            item.validate = this.getValidate(item, 'data');
            this.item.push(item);
            console.log(item);
        }
    };

    events () {
        for (let i of this.item) {
            for (let j of i.trigger) {
                if (j.eve === 'change') {
                    this.addWatcher(i, j.el);
                }
                if (j.eve === 'blur' || j.eve === 'input') {
                    //if (!j.el) {
                        this.addInputWatcher(i, j.eve, j.el);
                    //}
                }
            }
        }
    };

    addWatcher (item, el) {
        // change 事件
        const $parent = this.el.$parent;
        const element = this.find(el) || item;
        $parent.$watch(element.model.expression, element.validate);
    };

    addInputWatcher (item, eve, el) {
        // blur 事件触法条件 input textarea 或者contenteditable元素
        const element = this.find(el) || item;
        const elm = element.com.elm;
        const blurElm = check(elm);
        if (blurElm) {
            blurElm.addEventListener(eve, function (e) {
                //item.validate(this.value);
                element.validate(item);
            });
        }
    };

    getValidate (item, key) {
        let validate = item.validateContext || {};
        const $parent = this.el.$parent;
        validate = Object.assign(this.rule[key][item.name] || {}, validate);
        console.log(validate);
        return (item) => {
            const value = item.model ? $parent.$data[item.model.expression] : item.com.elm.value;
            const error = judge(validate, value, item, this.el.$parent);
            if (error.detail.length > 0) {
                $parent.$set($parent.errors, item.name, true);
                $parent.$set($parent.errors, item.name + 'Error', error.detail[0].text);
            } else {
                $parent.$set($parent.errors, item.name, false);
                $parent.$set($parent.errors, item.name + 'Error', '');
            }
            console.log(error);
        };
    };

    validateAll () {
        for (let i of this.item) {
            i.validate();
        }
    };

    validateItem (name) {
        const item = this.find(name);
        if (item) item.validate();
    };
};
