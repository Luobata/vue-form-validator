import bind from './bind.js';
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
                    item.name = i.data.attrs['validate-name'];

                    // console.log(item);
                }

                if (j.name === 'model') {
                    item.model = {
                        value: j.value,
                        expression: j.expression
                    };
                }
            }
            if (item.com) {
                item.validate = this.getValidate();
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
                if (j.eve === 'blur') {
                    if (!j.el) {
                        this.addBlur(i);
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

    addBlur (item) {
        // blur 事件触法条件 input textarea 或者contenteditable元素
        const elm = item.com.elm;
        const blurElm = check(elm);
        if (blurElm) {
            blurElm.addEventListener('blur', function (e) {
                item.validate();
                console.log(e, this);
            });
        }
    };

    getValidate () {
        return () => {
            console.log(111);
        };
    };
};
