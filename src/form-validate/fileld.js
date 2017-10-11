import bind from './bind.js';

export default class Field {
    item: Array;

    constructor(components) {
        this.item = [];
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

                    console.log(item);
                }

                if (j.name === 'model') {
                    item.model = {
                        value: j.value,
                        expression: j.expression
                    };
                }
            }
            if (item.com) {
                this.item.push(item);
            }
        }
    };

    events() {
        for (let i of this.item) {
            for (let j of i.trigger) {
                if (j.eve === 'blur') {
                    if (!j.el) {
                        console.log(i.com.elm);
                    }
                }
            }
        }
    };
};
