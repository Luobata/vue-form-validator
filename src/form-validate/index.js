import validate from './validate.vue';
import bind from './bind.js';

const init = (el) => {
    const name = el.getAttribute('validate-name');
};

function plugin (Vue) {
    if (plugin.installed) {
        console.log('installed');
        return;
    }
    //console.log(Vue.options);
    //console.log(Vue.config);
    Vue.directive('validate', {
        bind: function (el, binding, vnode, oldVnode) {
            const data = init(el);
            //bind(el);
            console.log(el);
            // v-model el.__vue__.value;
            // v-model vnode.data.directives[0]
            //el.addEventListener('blur', function (e) {
            //    console.log(e.target.value);
            //});
            //console.log(el.__vue__);
            //console.log(vnode.data.directives);
        },
        componentUpdated: function (el) {
            // console.log(2, el);
        },
        update: function (el) {
            // console.log(1, el);
        }
    });
    Vue.component(validate.name, validate);
};

export default plugin;
