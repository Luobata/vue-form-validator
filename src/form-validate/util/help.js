import {
    isObj,
    isArr,
} from './type';

export const has = (obj, key) => ({}.hasOwnProperty.call(obj, key));

export const hasValue = (arr, key, value) => {
    if (!isObj(arr) && !isArr(arr)) return false;

    if (isArr(arr)) {
        for (const i of arr) {
            if (i[key] === value) {
                return i;
            }
        }
    }

    if (isObj(arr)) {
        if (arr[key] === value) return arr[key];
    }

    return false;
};

export const check = (elm) => {
    const elements = ['input', 'textarea'];
    let dom = null;

    for (const i of elements) {
        const els = (elm.tagName.toLowerCase(i) === i) ? elm
            : elm.querySelectorAll(i)[0];
        if (els) {
            dom = els;
            break;
        }
    }

    if (!dom) {
        /* eslint-disable no-console */
        console.error('event blur must has input or textarea');
        /* eslint-disable no-console */
    }

    return dom;
};

export const isTelphone = (val) => {
    const reg = /^1[34578]\d{9}$/;
    return reg.test(val);
};

export const isEmail = (val) => {
    const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(val);
};

export const ispositive = (val) => {
    const reg = /^\d+(?:\.\d+)?$/;
    return reg.test(val);
};

export const isPositive = (val) => {
    const reg = /^([1-9]+\d*\.?\d*)|(0\.\d+)$/;
    return reg.test(val);
};

export const isnegative = (val) => {
    const reg = /^((-\d+\.?\d*)|(0+))$/;
    return reg.test(val);
};

export const isNegative = (val) => {
    const reg = /^-\d+\.?\d*$/;
    return reg.test(val);
};

export const splitKeys = (key, vNode) => {
    const keyArr = key.split('.');
    let name = vNode;
    let str = 'that';
    for (const i of keyArr) {
        name = name[i];
        str += `['${i}']`;
    }

    return {
        funStr: str,
        value: name,
    };
};
