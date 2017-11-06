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
