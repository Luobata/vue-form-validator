import {
    isNum,
} from './type';

export const isInt = (val, isNumFlag = true) => {
    if (isNumFlag && !isNum(val)) {
        return false;
    }

    return /^-?\d+$/.test(val);
};

export const isFloat = (val, isNumFlag = true) => {
    if (isNumFlag && !isNum(val)) {
        return false;
    }

    return /^(-?\d+)(\.\d+)?$/.test(val);
};
