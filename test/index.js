import vue from 'vue';
import vueResource from 'vue-resource';
import app from './app.vue';
import validate from '../dist/validate';
import VeeValidate from 'vee-validate';
import vueRouter from 'vue-router';

//vue.use(VeeValidate);

vue.config.devtools = true;
vue.use(vueResource);
vue.use(vueRouter);
vue.use(validate);
var routes = require('./route.js');

var router = new vueRouter({
    mode: 'hash',
    routes: routes
});

new vue({
    el: '#app',
    router,
    render (fn) {
        return fn(app);
    }
});
