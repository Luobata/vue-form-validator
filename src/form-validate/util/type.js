export const check = (elm) => {
    const elements = ['input', 'textarea'];
    let dom = null;

    for (let i of elements) {
        let els = (elm.tagName.toLowerCase(i) === i) ? elm
            : elm.querySelectorAll(i)[0];
        if (els) {
            dom = els;
            break;
        }
    }

    if (!dom) {
        console.error('event blur must has input or textarea');
    }

    return dom;
};

export const isNum = (val) => Object.prototype.toString.call(val) === '[object Number]';

export const isStr = (val) => Object.prototype.toString.call(val) === '[object String]';

export const isObj = (val) => Object.prototype.toString.call(val) === '[object Object]';

export const isFun = (val) => Object.prototype.toString.call(val) === '[object Function]';

export const isEmptyObj = (obj) => {
    if (!isObj(obj)) return false;

    let flag = false;

    for (let i in obj) {
        flag = true;
        break;
    }

    return flag;
};

export const getChineseLength = (str) => {
    if (str == null) return 0;  
    if (typeof str != "string"){  
        str += "";  
    }  
    return str.replace(/[^\x00-\xff]/g, '01').length / 2;  
};
