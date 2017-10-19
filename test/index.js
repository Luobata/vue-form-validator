import vue from 'vue';
import vueResource from 'vue-resource';
import app from './app.vue';
import validate from '../dist/validate';
import VeeValidate from 'vee-validate';

//vue.use(VeeValidate);

vue.config.devtools = true;
vue.use(vueResource);

vue.use(validate);

new vue({
    el: '#app',
    render (fn) {
        return fn(app);
    }
});
