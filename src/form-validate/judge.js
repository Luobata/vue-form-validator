import { has } from './util/index.js';

class Error {
    //errorTpl = {
    //    key: '', // error key like min max
    //    value: '', // key value
    //    actual: '', // actual value
    //};

    constructor (key, value, actual, target) {
        this.key = key;
        this.value = value;
        this.actual = actual;
        this.target = target;
    };
};

const getTarget = (item) => (item.com.elm)


export default (validate, value, item) => {
    let type;
    let val;
    let target = getTarget(item);
    let errors = {
        type: '',
        detail: []
    };

    if (has(validate, 'min') || has(validate, 'max')) {
        type = 'number';
    }

    switch (type) {
        case 'number':
        val = parseFloat(value, 10);
            if (value !== '' 
                && value !== undefined
                && isNaN(val)) {
                errors.type = 'wrong type';
            }
            break;
    };

    if (errors.type) {
        return errors;
    }

    if (has(validate, 'min') && val < validate['min']) {
        errors.detail.push(new Error('min', validate['min'], value, target));
    }

    if (has(validate, 'max') && val > validate['max']) {
        errors.detail.push(new Error('max', validate['max'], value, target));
    }


    return errors;
};
