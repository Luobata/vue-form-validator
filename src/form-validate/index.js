import validate from './validate.vue';
import bind from './bind.js';

const init = (el) => {
    const name = el.getAttribute('validate-name');
};

export default {
    install (Vue) {
        Vue.directive('validate', {
            //params: ['validate-name']
             bind: function (el, binding, vnode, oldVnode) {
                const data = init(el);
                bind(el);
                // v-model el.__vue__.value;
                el.addEventListener('blur', function (e) {
                    console.log(e.target.value);
                });
                console.log(el.__vue__);
                //console.log(el.__vue__.value);
            },
            componentUpdated: function (el) {
                // console.log(2, el);
            },
            update: function (el) {
                // console.log(1, el);
            }
        });
        Vue.component(validate.name, validate);
    }
};
