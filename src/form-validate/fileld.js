import bind from './bind';
import rule from './rule';
import anlyse from './anlyse';
import judge from './judge';
import {
    check,
    has,
    hasValue,
    splitKeys,
    keycode,
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
        const find = (component) => {
            for (const i of component) {
                if (i.children && i.children.length) find(i.children);
                if (!i.data) continue;
                const dir = i.data.directives || [];
                const name = hasValue(dir, 'name', 'validate');
                const model = hasValue(dir, 'name', 'model');
                const item = {};

                if (name ||
                    (i.data.attrs &&
                        has(i.data.attrs, 'validate-name'))
                ) {
                    item.com = i;
                    item.name = i.data.attrs['validate-name'];
                    item.showName = i.data.attrs['validate-name'];
                    item.trigger = bind(i.data.attrs.trigger
                        || (this.rule.validate[item.name] || {}).trigger);
                    item.validateContext = anlyse(i);
                }

                if (model) {
                    item.model = {
                        value: model.value,
                        expression: model.expression,
                    };
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
                if (j.eve === 'blur'
                    || j.eve === 'input'
                    || j.eve === 'focus'
                    || j.eve === 'keydown'
                    || j.eve === 'keyup'
                    || keycode.test(j.eve)) {
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
            if (keycode.test(trigger.eve)) {
                const code = parseInt(trigger.eve.match(keycode)[1], 10) || 13;
                blurElm.addEventListener('keydown', (e) => {
                    if (e.keyCode === code) {
                        item.validate(item);
                    }
                });
            } else {
                blurElm.addEventListener(trigger.eve, () => {
                    item.validate(item);
                });
            }
        }
    }

    getValidate(items, key) {
        let validate = items.validateContext || {};
        const $parent = this.config.$parent || this.el.$parent;
        validate = Object.assign(this.rule[key][items.name] || {}, validate);

        return (item) => {
            const value = item.model ?
                splitKeys(item.model.expression, $parent.$data).value :
                item.com.elm.value;
            const error = judge(validate, value, item, $parent, this);
            const name = item.showName;

            if (error.detail.length > 0) {
                $parent.$set($parent.errors, name, true);
                $parent.$set($parent.errors, `${name}Error`, error.detail[0].text);
            } else {
                $parent.$set($parent.errors, name, false);
                $parent.$set($parent.errors, `${name}Error`, '');
            }
            // console.log(error);
            return !error.detail.length;
        };
    }

    validateAll() {
        let flag = true;
        for (const i of this.item) {
            flag = i.validate(i) && flag;
        }

        return flag;
    }

    validateItem(name) {
        const item = this.find(name);
        if (item) return item.validate(item);

        return true;
    }
}
