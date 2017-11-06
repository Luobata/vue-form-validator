export const sysConfig = {
    dataName: '$$data-',
    reservedWord: [],
    configKey: ['text', 'trigger', 'config'],
};

/*
 * @params lengthtype {String | Function} eng english-type chi chinese-type
 */
export const userConfig = {
    lengthType: 'eng',
};

export const setUserConfig = conf => (Object.assign(userConfig, conf));
