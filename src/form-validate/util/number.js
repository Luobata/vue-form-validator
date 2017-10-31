import {
    isNum,
    isStr,
} from './type.js';

export const isInt = (val) => {
    if (!isNum(val)) {
        return false;
    }

    return /^-?\d+$/.test(val);
};

export const isFloat = (val) => {
    if (!isNum(val)) {
        return false;
    }

    return /^(-?\d+)(\.\d+)?$/.test(val);
};
