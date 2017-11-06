import bind from './bind';
import rule from './rule';
import anlyse from './anlyse';
import judge from './judge';
import { check } from './util/index';
import { sysConfig } from './conf';

let globalId = 0;

const finds = items => (name) => {
    if (!name) return undefined;

    for (const i of items) {
        if (i.name === name) {
            return i;
        }
    }
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
        for (const i of components) {
            if (!i.data) continue;
            const dir = i.data.directives;
            const item = {};
            for (const j of dir) {
                if (j.name === 'validate') {
                    item.com = i;
                    item.name = i.data.attrs['validate-name'];
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
    }

    dataInit() {
        const datas = this.rule.data;
        for (const i in datas) {
            const item = {};
            const value = datas[i];
            item.name = i;
            item.trigger = bind(value.trigger);
            item.model = {
                value: '',
                expression: i.replace(sysConfig.dataName, ''),
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
            this.el.$parent,
            this.find(trigger.el) || item,
        ];
        // const $parent = this.el.$parent;
        // const element = this.find(trigger.el) || item;
        $parent.$watch(element.model.expression, () => {
            item.validate(item);
        });
    }

    addInputWatcher(item, trigger) {
        // blur 事件触法条件 input textarea 或者contenteditable元素
        const element = this.find(trigger.el) || item;
        // const [
        //    //element,
        //    elm,
        //    blurElm,
        // ] = [
        //    //this.find(trigger.el) || item,
        //    element.com.elm,
        //    check(elm),
        // ];
        const elm = element.com.elm;
        const blurElm = check(elm);
        if (blurElm) {
            blurElm.addEventListener(trigger.eve, () => {
                item.validate(item);
            });
        }
    }

    getValidate(items, key) {
        let validate = items.validateContext || {};
        const $parent = this.el.$parent;
        validate = Object.assign(this.rule[key][items.name] || {}, validate);
        return (item) => {
            const value = item.model ? $parent.$data[item.model.expression] : item.com.elm.value;
            const error = judge(validate, value, item, $parent, this);
            if (error.detail.length > 0) {
                $parent.$set($parent.errors, item.name, true);
                $parent.$set($parent.errors, `${item.name}Error`, error.detail[0].text);
            } else {
                $parent.$set($parent.errors, item.name, false);
                $parent.$set($parent.errors, `${item.name}Error`, '');
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
