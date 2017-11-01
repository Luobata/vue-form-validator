import { has } from './util/index.js';

export default (vNode) => {
    const attrs = vNode.data.attrs;
    const validate = {};

    // 最小值 必须是数字 大写为不包括边界值
    if (has(attrs, 'min')) {
        validate['min'] = attrs['min'];
    }

    if (has(attrs, 'Min')) {
        validate['Min'] = attrs['Min'];
    }

    // 最大值 必须是数字
    if (has(attrs, 'max')) {
        validate['max'] = attrs['max'];
    }

    if (has(attrs, 'Max')) {
        validate['Max'] = attrs['Max'];
    }

    // 最小长度 必须是数字
    if (has(attrs, 'min-length')) {
        validate['min-length'] = attrs['min-length'];
    }

    // 最大长度 必须是数字
    if (has(attrs, 'max-length')) {
        validate['max-length'] = attrs['max-length'];
    }

    if (has(attrs, 'Min-length')) {
        validate['Min-length'] = attrs['Min-length'];
    }

    if (has(attrs, 'Max-length')) {
        validate['Max-length'] = attrs['Max-length'];
    }

    // 必填
    if (has(attrs, 'required')) {
        validate['required'] = true;
    }

    // 数字 可以是字符串数字
    // int or float
    if (has(attrs, 'number')) {
        validate['number'] = attrs['number'] || 'int';
    }

    // 数字 不能是字符串数字
    if (has(attrs, 'Number')) {
        validate['Number'] = attrs['Number'] || 'int';
    }

    if (has(attrs, 'max-float-length')) {
        validate['max-float-length'] = attrs['max-float-length'];
    }

    if (has(attrs, 'min-float-length')) {
        validate['min-float-length'] = attrs['min-float-length'];
    }

    if (has(attrs, 'Max-float-length')) {
        validate['Max-float-length'] = attrs['Max-float-length'];
    }

    if (has(attrs, 'Min-float-length')) {
        validate['Min-float-length'] = attrs['Min-float-length'];
    }

    return validate;
};
