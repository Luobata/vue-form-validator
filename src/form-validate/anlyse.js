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
    if (has(attrs, 'minlength')) {
        validate['minlength'] = attrs['minlength'];
    }

    // 最大长度 必须是数字
    if (has(attrs, 'maxlength')) {
        validate['maxlength'] = attrs['maxlength'];
    }

    if (has(attrs, 'Minlength')) {
        validate['Minlength'] = attrs['Minlength'];
    }

    if (has(attrs, 'Maxlength')) {
        validate['Maxlength'] = attrs['Maxlength'];
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

    if (has(attrs, 'maxfloatlength')) {
        validate['maxfloatlength'] = attrs['maxfloatlength'];
    }

    if (has(attrs, 'minfloatlength')) {
        validate['minfloatlength'] = attrs['minfloatlength'];
    }

    if (has(attrs, 'Maxfloatlength')) {
        validate['Maxfloatlength'] = attrs['Maxfloatlength'];
    }

    if (has(attrs, 'Minfloatlength')) {
        validate['Minfloatlength'] = attrs['Minfloatlength'];
    }

    return validate;
};
