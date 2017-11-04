const eventType = [
    'blur', 'change', 'input'
];

const triggerAnalyse = (triggerStr) => {
    if (!triggerStr) return [];

    const triggerArr = triggerStr.split(';');
    let arr = [];
    for (let i of triggerArr) {
        const rurl = /(?:\$(.*)\.|)(.*)$/;
        const regArr = rurl.exec(i);
        const el = regArr[1];
        const eve = regArr[2];

        if (eventType.indexOf(eve) === -1) {
            console.error(eve + ' is not a correct event type');
            continue;
        }
        arr.push({el, eve});
    }


    return arr;
};

export default (trigger) => {
    //const trigger = el.trigger;
    const triggerArr = triggerAnalyse(trigger);
    
    return triggerArr;
}
