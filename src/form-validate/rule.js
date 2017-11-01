import { 
    isEmptyObj,
    isObj,
} from './util/index.js';

export default (rule) => {
    if (!isObj(rule)) return {};

    let errorText = rule.text || '';
};
