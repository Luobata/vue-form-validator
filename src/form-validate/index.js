import validate from './validate.vue';
import directive from './directive';
import mixin from './mixin';
import { setUserConfig } from './conf';

function plugin(Vue, conf) {
    if (plugin.installed) {
        /* eslint-disable no-console */
        console.warn('installed');
        /* eslint-disable no-console */
        return;
    }
    setUserConfig(conf);
    directive(Vue);
    mixin(Vue);
    Vue.component(validate.name, validate);
}

export default plugin;
