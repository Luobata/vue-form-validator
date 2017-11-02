import bind from './bind.js';
import rule from './rule.js';
import anlyse from './anlyse.js';
import judge from './judge.js';
import Watcher from './watcher.js';
import { check } from './util/index.js';

let find = (items) => {
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

    constructor(components, el) {
        this.item = [];
        this.el = el;
        this.config = el.config;
        this.rule = rule(el.rule);
        this.init(components);
        find = find(this.items);

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
                item.validate = this.getValidate(item);
                this.item.push(item);
            }
        }
    };

    events() {
        for (let i of this.item) {
            for (let j of i.trigger) {
                if (j.eve === 'change') {
                    this.addWatcher(i, j.el);
                }
                if (j.eve === 'blur' || j.eve === 'input') {
                    if (!j.el) {
                        this.addInputWatcher(i, j.eve, j.el);
                    }
                }
            }
        }
    };

    addWatcher (item) {
        // change 事件
        const $parent = this.el.$parent;
        $parent.$watch(item.model.expression, item.validate);
    };

    addInputWatcher (item, eve, el) {
        // blur 事件触法条件 input textarea 或者contenteditable元素
        const element = (find(el) || item);
        const elm = element.com.elm;
        const blurElm = check(elm);
        if (blurElm) {
            blurElm.addEventListener(eve, function (e) {
                item.validate(this.value);
            });
        }
    };

    getValidate (item) {
        let validate = item.validateContext;
        validate = Object.assign(this.rule[item.name] || {}, validate);
        console.log(validate);
        return (value) => {
            const error = judge(validate, value, item);
            console.log(error);
        };
    };

    validateAll () {
        for (let i of this.item) {
            i.validate();
        }
    };

    validateItem (name) {
        const item = find(name);
        if (item) item.validate();
    };
};
