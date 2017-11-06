import plugin from './form-validate';

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

module.exports = plugin;
