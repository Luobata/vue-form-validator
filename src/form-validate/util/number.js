import {
    isNum,
} from './type';

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
