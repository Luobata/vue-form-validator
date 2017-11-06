import {
    isObj,
} from './util/index';
import { sysConfig } from './conf';

const covert = (str) => {
    let key;
    switch (str) {
    case 'minlength':
        key = 'min-length';
        break;
    default:
        break;
    }
    key = str.replace(/([min|max|Min|Max])(length)/, '$1-$2');
    return key;
};

export default (rule) => {
    if (!isObj(rule)) return {};

    let errorText;
    // let trigger;
    const validate = rule.validate || {};
    const data = rule.data || {};
    const rules = {
        validate: {},
        data: {},
    };
    const add = (obj, objStr) => {
        for (const i in obj) {
            if (!{}.hasOwnProperty.call(obj, i)) continue;
            const item = obj[i];
            const keyStr = (objStr === 'data') ? sysConfig.dataName + i : i;
            errorText = item.text || '';
            // trigger = item.trigger || '';
            rules[objStr][keyStr] = {};
            for (const j in item) {
                if (!{}.hasOwnProperty.call(item, j)) continue;
                const value = item[j];
                const key = covert(j, objStr);

                if (sysConfig.configKey.indexOf(key) !== -1) {
                    rules[objStr][keyStr][key] = value;
                    continue;
                }

                if (isObj(value)) {
                    rules[objStr][keyStr][key] = value;
                } else {
                    rules[objStr][keyStr][key] = {
                        value,
                        text: errorText,
                    };
                }
            }
        }
    };

    add(validate, 'validate');
    add(data, 'data');

    return rules;
};
