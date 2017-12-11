import {
    keycode,
} from './util/index';

const eventType = [
    'blur', 'change', 'input', 'focus', 'keydown', 'keyup', // event
    'length', // Array protototype
];


const triggerAnalyse = (triggerStr) => {
    if (!triggerStr) return [];

    const triggerArr = triggerStr.split(';');
    const arr = [];
    // for (const i of triggerArr) {
    for (let j = 0; j < triggerArr.length; j++) {
        const i = triggerArr[j];
        const rurl = /(?:(\$*)(.*)\.|)(.*)$/;
        const regArr = rurl.exec(i);
        const type = regArr[1] === undefined || regArr[1] === '$' ? 'validateDom' : 'data';
        const el = regArr[2];
        const eve = regArr[3];

        // keycode 特殊处理
        if (eventType.indexOf(eve) === -1 && !keycode.test(eve)) {
            /* eslint-disable no-console */
            console.error(`${eve} is not a correct event type`);
            /* eslint-disable no-console */
            continue;
        }
        arr.push({ el, eve, type });
    }


    return arr;
};

export default (trigger) => {
    // const trigger = el.trigger;
    const triggerArr = triggerAnalyse(trigger);

    return triggerArr;
};
