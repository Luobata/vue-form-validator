import bind from './bind.js';
import anlyse from './anlyse.js';
import judge from './judge.js';
import Watcher from './watcher.js';
import { check } from './util/index.js';

export default class Field {
    item: Array;
    el: Vue;

    constructor(components, el) {
        this.item = [];
        this.el = el;
        this.init(components);

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
                    this.addWatcher(i);
                }
                if (j.eve === 'blur' || j.eve === 'input') {
                    if (!j.el) {
                        this.addInputWatcher(i, j.eve);
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

    addInputWatcher (item, eve) {
        // blur 事件触法条件 input textarea 或者contenteditable元素
        const elm = item.com.elm;
        const blurElm = check(elm);
        if (blurElm) {
            blurElm.addEventListener(eve, function (e) {
                item.validate();
                console.log(e, this);
            });
        }
    };

    getValidate (item) {
        const validate = item.validateContext;
        return (value) => {
            const error = judge(validate, value);
            console.log(validate);
        };
    };

    validateAll () {
        for (let i of this.item) {
            i.validate();
        }
    };

    validateItem(name) {
        for (let i of this.item) {
            if (name === i.name) {
                i.validate();
                break;
            }
        }
    };
};
