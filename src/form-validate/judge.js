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
const config = userConfig;

const getLength = (val) => {
    const type = config.lengthType;
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

const getFloatLength = (val) => {
    const floatNum = val.match(/.*?[\.](\d)/);
    let len = 0;
    if (floatNum && floatNum.length && floatNum[1]) {
        len = floatNum[1].length;
    }

    return len;
};



export default (validate, value, item, $parent, Vue) => {
    let type;
    let val;
    let length;
    let floatLen;
    let key;
    let target = getTarget(item);
    let errors = {
        type: '',
        detail: []
    };
    let text = validate.text || '';
    Object.assign(config, Vue.config);
    Object.assign(config, validate.config);
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

    if (has(validate, 'min-float-length') || 
        has(validate, 'max-float-length') ||
        has(validate, 'Min-float-length') ||
        has(validate, 'Max-float-length')
    ) {
        floatLen = getFloatLength(value);
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

    key = 'min';
    if (has(validate, key) && val <= cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), value, target));
    }

    key = 'max';
    if (has(validate, key) && val >= cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), value, target));
    }

    key = 'Min';
    if (has(validate, key) && val < cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), value, target));
    }

    key = 'Max';
    if (has(validate, key) && val > cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), value, target));
    }

    key = 'min-length';
    if (has(validate, key) && length <= cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), length, target));
    }

    key = 'max-length';
    if (has(validate, key) && length >= cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), length, target));
    }

    key = 'Min-length';
    if (has(validate, key) && length < cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), length, target));
    }

    key = 'Max-length';
    if (has(validate, key) && length > cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), length, target));
    }

    key = 'min-float-length';
    if (has(validate, key) && floatLen <= cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), floatLen, target));
    }

    key = 'max-float-length';
    if (has(validate, key) && floatLen >= cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), floatLen, target));
    }

    key = 'Min-float-length';
    if (has(validate, key) && floatLen < cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), floatLen, target));
    }

    key = 'Max-float-length';
    if (has(validate, key) && floatLen > cal(validate[key])) {
        errors.detail.push(new Error(key, cal(validate[key]), floatLen, target));
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
