import validate from './validate.vue';
import bind from './bind.js';
import directive from './directive.js';
import mixin from './mixin.js';

function plugin (Vue) {
    if (plugin.installed) {
        console.log('installed');
        return;
    }
    //console.log(Vue.options);
    //console.log(Vue.config);
    directive(Vue);
    mixin(Vue);
    Vue.component(validate.name, validate);
};

export default plugin;
