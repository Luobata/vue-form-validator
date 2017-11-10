import bind from './bind';
import rule from './rule';
import anlyse from './anlyse';
import judge from './judge';
import {
    check,
    has,
    splitKeys,
} from './util/index';
import { sysConfig } from './conf';

let globalId = 0;

const finds = items => (name) => {
    if (!name) return false;

    for (const i of items) {
        if (i.name === name) {
            return i;
        }
    }

    return false;
};

export default class Field {
    // item: Array;
    // el: Vue;
    // rule: Object;
    // find: Function;

    constructor(components, el) {
        this.item = [];
        this.el = el;
        this.config = el.config;
        this.rule = rule(el.rule);
        this.init(components);
        this.dataInit();
        this.find = finds(this.item);

        this.events();
    }

    init(components) {
        const find = (components) => {
            for (const i of components) {
                if (i.children && i.children.length) find(i.children);
                if (!i.data) continue;
                const dir = i.data.directives || [];
                const item = {};
                for (const j of dir) {
                    if (j.name === 'validate') {
                        item.com = i;
                        item.name = i.data.attrs['validate-name'];
                        item.showName = i.data.attrs['validate-name'];
                        item.trigger = bind(i.data.attrs.trigger
                            || this.rule.validate[item.name].trigger);
                        item.validateContext = anlyse(i);
                    }

                    if (j.name === 'model') {
                        item.model = {
                            value: j.value,
                            expression: j.expression,
                        };
                    }
                }
                if (item.com) {
                    item.validate = this.getValidate(item, 'validate');
                    item.id = globalId;
                    globalId += 1;
                    this.item.push(item);
                }
            }
        };

        find(components);
    }

    dataInit() {
        const datas = this.rule.data;
        for (const i in datas) {
            if (!has(datas, i)) continue;
            const item = {};
            const value = datas[i];
            const name = i.replace(sysConfig.dataName, '');
            item.name = i;
            item.showName = name;
            item.trigger = bind(value.trigger);
            item.model = {
                value: '',
                expression: name,
            };
            // 用于target选择不报错
            item.com = '';
            item.validate = this.getValidate(item, 'data');
            this.item.push(item);
        }
    }

    events() {
        for (const i of this.item) {
            for (const j of i.trigger) {
                if (j.eve === 'change') {
                    this.addWatcher(i, j);
                }
                if (j.eve === 'blur' || j.eve === 'input') {
                    this.addInputWatcher(i, j);
                }
            }
        }
    }

    addWatcher(item, trigger) {
        // change 事件
        // item 要检验的对象
        // trigger 触法的对象
        const [$parent, element] = [
            this.config.$parent || this.el.$parent,
            this.find(trigger.el) || item,
        ];
        $parent.$watch(element.model.expression, () => {
            item.validate(item);
        });
    }

    addInputWatcher(item, trigger) {
        // blur 事件触法条件 input textarea 或者contenteditable元素
        const element = this.find(trigger.el) || item;
        const { elm } = element.com;
        const blurElm = check(elm);
        if (blurElm) {
            blurElm.addEventListener(trigger.eve, () => {
                item.validate(item);
            });
        }
    }

    getValidate(items, key) {
        let validate = items.validateContext || {};
        const $parent = this.config.$parent || this.el.$parent;
        //const { $parent } = this.el;
        validate = Object.assign(this.rule[key][items.name] || {}, validate);
        return (item) => {
            const value = item.model ? splitKeys(item.model.expression, $parent.$data).value : item.com.elm.value;
            const error = judge(validate, value, item, $parent, this);
            const name = item.showName;

            if (error.detail.length > 0) {
                $parent.$set($parent.errors, name, true);
                $parent.$set($parent.errors, `${name}Error`, error.detail[0].text);
            } else {
                $parent.$set($parent.errors, name, false);
                $parent.$set($parent.errors, `${name}Error`, '');
            }
            console.log(error);
        };
    }

    validateAll() {
        for (const i of this.item) {
            i.validate();
        }
    }

    validateItem(name) {
        const item = this.find(name);
        if (item) item.validate();
    }
}
