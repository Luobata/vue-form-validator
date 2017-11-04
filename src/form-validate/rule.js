import { 
    isEmptyObj,
    isObj,
} from './util/index.js';
import { sysConfig } from './conf.js';

const covert = (str) => {
    let key;
    switch (str) {
        case 'minlength':
        key = 'min-length';
    }
    key = str.replace(/([min|max|Min|Max])(length)/, '$1-$2');
    return key;
};

export default (rule) => {
    if (!isObj(rule)) return {};

    let errorText; 
    let validate = rule.validate || {};
    let data = rule.data || {};
    let trigger; 
    let rules = {
        validate: {},
        data: {},
    };
    const add = (obj, objStr) => {
        for (let i in obj) {
            const item = obj[i];
            const keyStr = (objStr === 'data') ? sysConfig.dataName + i : i;
            errorText = item.text || '';
            trigger = item.trigger || '';
            rules[objStr][keyStr] = {};
            for (let j in item) {
                const value = item[j];
                const key = covert(j, objStr);

                if (sysConfig.configKey.indexOf(key) ! == -1) {
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
    console.log(rules);

    return rules;
};
