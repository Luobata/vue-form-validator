import {
    has,
    isInt,
    isFloat,
} from './util/index.js';

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

const getTarget = (item) => (item.com.elm);

const getLength = () => {
};


export default (validate, value, item) => {
    let type;
    let val;
    let length;
    let target = getTarget(item);
    let errors = {
        type: '',
        detail: []
    };

    if (has(validate, 'min') || 
        has(validate, 'max') ||
        has(validate, 'Min') ||
        has(validate, 'Max')
    ) {
        type = 'number';
    }

    if (has(validate, 'minlength') || 
        has(validate, 'maxlength') ||
        has(validate, 'Minlength') ||
        has(validate, 'Maxlength')
    ) {
        length = getLength(value);
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
        default:
        val = value;
    };

    if (errors.type) {
        return errors;
    }

    if (has(validate, 'min') && val <= validate['min']) {
        errors.detail.push(new Error('min', validate['min'], value, target));
    }

    if (has(validate, 'max') && val >= validate['max']) {
        errors.detail.push(new Error('max', validate['max'], value, target));
    }

    if (has(validate, 'Min') && val < validate['Min']) {
        errors.detail.push(new Error('Min', validate['Min'], value, target));
    }

    if (has(validate, 'Max') && val > validate['Max']) {
        errors.detail.push(new Error('Max', validate['Max'], value, target));
    }

    if (has(validate, 'minlength') && length <= validate['minlength']) {
        errors.detail.push(new Error('minlength', validate['minlength'], length, target));
    }

    if (has(validate, 'maxlength') && length >= validate['maxlength']) {
        errors.detail.push(new Error('maxlength', validate['maxlength'], length, target));
    }

    if (has(validate, 'Minlength') && length < validate['Minlength']) {
        errors.detail.push(new Error('Minlength', validate['Minlength'], length, target));
    }

    if (has(validate, 'Maxlength') && length > validate['Maxlength']) {
        errors.detail.push(new Error('Maxlength', validate['Maxlength'], length, target));
    }

    if (has(validate, 'required') &&
        (val === undefined ||
        val === null ||
        val === '')
    ) {
        errors.detail.push(new Error('require', '', value, target));
    }

    if (attrs('number') === 'int') {
        if (isNaN(parseInt(val, 10))) {
            errors.detail.push(new Error('number', '', val, target));
        }
    } else if (attrs['number'] === 'float')  {
        if (isNaN(parseFloat(val, 10))) {
            errors.detail.push(new Error('number', '', val, target));
        }
    }

    if (attrs('Number') === 'int') {
        if (isInt(val)) {
            errors.detail.push(new Error('Number', '', val, target));
        }
    } else if (attrs['Number'] === 'float')  {
        if (isFloat(val)) {
            errors.detail.push(new Error('Number', '', val, target));
        }
    }



    return errors;
};
