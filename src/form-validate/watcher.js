export default class Watcher {
    constructor (el) {
        el.$watch('data', function () {
            console.log(222);
        });
    };
};
