import { has } from './util/index.js';

class Error {
    //errorTpl = {
    //    key: '', // error key like min max
    //    value: '', // key value
    //    actual: '', // actual value
    //};

    constructor (key, value, actual) {
        this.key = key;
        this.value = value;
        this.actual = actual;
    };
};


export default (validate, value) => {
    let type;
    let val;
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
            if (isNaN(val)) {
                errors.type = 'wrong type';
            }
            break;
    };

    if (errors.type) {
        return errors;
    }

    if (has(validate, 'min') && val < min) {
        errors.detail.push(new Error('min', validate['min'], value));
    }

    if (has(validate, 'max') && val > max) {
        errors.detail.push(new Error('max', validate['max'], value));
    }

};
