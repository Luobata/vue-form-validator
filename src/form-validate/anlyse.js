export default (vNode) => {
    const attrs = vNode.data.attrs;
    const validate = {};

    if (attrs.hasOwnProperty('min')) {
        validate['min'] = attrs['min'];
    }

    if (attrs.hasOwnProperty('max')) {
        validate['max'] = attrs['max'];
    }

    if (attrs.hasOwnProperty('required')) {
        validate['required'] = true;
    }

    return validate;
};
