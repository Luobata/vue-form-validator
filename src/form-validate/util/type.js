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
