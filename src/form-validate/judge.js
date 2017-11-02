import {
    has,
    isInt,
    isFloat,
    isFun,
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



export default (validate, value, item, $parent) => {
    let type;
    let val;
    let length;
    let target = getTarget(item);
    let errors = {
        type: '',
        detail: []
    };
    const cal = (val) => {
        if (isFun(val)) {
            return val.call($parent);
        } else {
            return val;
        }
    };

    if (has(validate, 'min') || 
        has(validate, 'max') ||
        has(validate, 'Min') ||
        has(validate, 'Max')
    ) {
        type = 'number';
    }

    if (has(validate, 'min-length') || 
        has(validate, 'max-length') ||
        has(validate, 'Min-length') ||
        has(validate, 'Max-length')
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

    if (has(validate, 'min') && val <= cal(validate['min'])) {
        errors.detail.push(new Error('min', validate['min'], value, target));
    }

    if (has(validate, 'max') && val >= cal(validate['max'])) {
        errors.detail.push(new Error('max', validate['max'], value, target));
    }

    if (has(validate, 'Min') && val < validate['Min']) {
        errors.detail.push(new Error('Min', validate['Min'], value, target));
    }

    if (has(validate, 'Max') && val > validate['Max']) {
        errors.detail.push(new Error('Max', validate['Max'], value, target));
    }

    if (has(validate, 'min-length') && length <= validate['min-length']) {
        errors.detail.push(new Error('min-length', validate['min-length'], length, target));
    }

    if (has(validate, 'max-length') && length >= validate['max-length']) {
        errors.detail.push(new Error('max-length', validate['max-length'], length, target));
    }

    if (has(validate, 'Min-length') && length < validate['Min-length']) {
        errors.detail.push(new Error('Min-length', validate['Min-length'], length, target));
    }

    if (has(validate, 'Max-length') && length > validate['Max-length']) {
        errors.detail.push(new Error('Max-length', validate['Max-length'], length, target));
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
