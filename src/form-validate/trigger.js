import {
    keycode,
} from './util/index';
const eventType = [
    'blur', 'change', 'input', 'focus', 'keydown', 'keyup',
];

const triggerAnalyse = (triggerStr) => {
    if (!triggerStr) return [];

    const triggerArr = triggerStr.split(';');
    const arr = [];
    for (const i of triggerArr) {
        const rurl = /(?:\$(.*)\.|)(.*)$/;
        const regArr = rurl.exec(i);
        const el = regArr[1];
        const eve = regArr[2];

        // keycode 特殊处理
        if (eventType.indexOf(eve) === -1 && !keycode.test(eve)) {
            /* eslint-disable no-console */
            console.error(`${eve} is not a correct event type`);
            /* eslint-disable no-console */
            continue;
        }
        arr.push({ el, eve });
    }


    return arr;
};

export default (trigger) => {
    // const trigger = el.trigger;
    const triggerArr = triggerAnalyse(trigger);

    return triggerArr;
};
