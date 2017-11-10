export const has = (obj, key) => ({}.hasOwnProperty.call(obj, key));

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

export const splitKeys = (key, vNode) => {
    const keyArr = key.split('.');
    let name = vNode;
    let str = 'that';
    for (let i of keyArr) {
        name = name[i];
        str += "['" + i + "']";
    }

    return {
        funStr: str,
        value: name
    };
};
