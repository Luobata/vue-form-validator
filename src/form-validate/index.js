import validate from './validate.vue';
import bind from './bind.js';
import directive from './directive.js';
import mixin from './mixin.js';
import { setUserConfig } from './conf.js';

function plugin (Vue, conf) {
    if (plugin.installed) {
        console.log('installed');
        return;
    }
    //console.log(Vue.options);
    //console.log(Vue.config);
    setUserConfig(conf);
    directive(Vue);
    mixin(Vue);
    Vue.component(validate.name, validate);
};

export default plugin;
