import vue from 'vue';
import vueResource from 'vue-resource';
import app from './app.vue';
import validate from '../dist/validate';

vue.config.devtools = true;
vue.use(vueResource);

vue.use(validate);

new vue({
    el: '#app',
    render (fn) {
        return fn(app);
    }
});
