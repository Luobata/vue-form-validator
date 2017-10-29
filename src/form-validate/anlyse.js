import { has } from './util/index.js';

export default (vNode) => {
    const attrs = vNode.data.attrs;
    const validate = {};

    if (has(attrs, 'min')) {
        validate['min'] = attrs['min'];
    }

    if (has(attrs, 'max')) {
        validate['max'] = attrs['max'];
    }

    if (has(attrs, 'required')) {
        validate['required'] = true;
    }

    return validate;
};
