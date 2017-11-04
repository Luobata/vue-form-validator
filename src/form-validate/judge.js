import {
    has,
    isInt,
    isFloat,
    isFun,
    isStr,
    getChineseLength,
} from './util/index.js';
import { userConfig } from './conf.js';


const getTarget = (item) => (item.com.elm);

const getLength = (val) => {
    const type = userConfig.lengthType;
    let len = 0;

    if (isStr(type)) {
        switch (type) {
            case 'eng':
            len = val.length;
            break;
            case 'chi':
            len = getChineseLength(val);
            break;
        }
    } else if (isFun(type)) {
        len = type(val);
    }

    return len;
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
    let text = validate.text || '';
    const cal = (val) => {
        if (isFun(val.value)) {
            return val.value.call($parent);
        } else {
            return val.value;
        }
    };

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
            this.text = validate[key].text || text;
        };
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
        errors.detail.push(new Error('min', cal(validate['min']), value, target));
    }

    if (has(validate, 'max') && val >= cal(validate['max'])) {
        errors.detail.push(new Error('max', cal(validate['max']), value, target));
    }

    if (has(validate, 'Min') && val < cal(validate['Min'])) {
        errors.detail.push(new Error('Min', cal(validate['Min']), value, target));
    }

    if (has(validate, 'Max') && val > cal(validate['Max'])) {
        errors.detail.push(new Error('Max', cal(validate['Max']), value, target));
    }

    if (has(validate, 'min-length') && length <= cal(validate['min-length'])) {
        errors.detail.push(new Error('min-length', cal(validate['min-length']), length, target));
    }

    if (has(validate, 'max-length') && length >= cal(validate['max-length'])) {
        errors.detail.push(new Error('max-length', cal(validate['max-length']), length, target));
    }

    if (has(validate, 'Min-length') && length < cal(validate['Min-length'])) {
        errors.detail.push(new Error('Min-length', cal(validate['Min-length']), length, target));
    }

    if (has(validate, 'Max-length') && length > cal(validate['Max-length'])) {
        errors.detail.push(new Error('Max-length', cal(validate['Max-length']), length, target));
    }

    if (has(validate, 'required') &&
        (val === undefined ||
        val === null ||
        val === '' ||
        isNaN(val))
    ) {
        errors.detail.push(new Error('required', '', value, target));
    }

    if (validate['number'] === 'int') {
        if (isNaN(parseInt(val, 10))) {
            errors.detail.push(new Error('number', '', val, target));
        }
    } else if (validate['number'] === 'float')  {
        if (isNaN(parseFloat(val, 10))) {
            errors.detail.push(new Error('number', '', val, target));
        }
    }

    if (validate['Number'] === 'int') {
        if (isInt(val)) {
            errors.detail.push(new Error('Number', '', val, target));
        }
    } else if (validate['Number'] === 'float')  {
        if (isFloat(val)) {
            errors.detail.push(new Error('Number', '', val, target));
        }
    }



    return errors;
};
