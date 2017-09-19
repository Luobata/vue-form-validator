import validate from './form-validate';

let installed = false;

const install = (Vue) => {
    if (installed) {
        console.log('installed already');
        return;
    }

    validate.install(Vue);
    installed = true;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
};

module.exports = {
    install
};
