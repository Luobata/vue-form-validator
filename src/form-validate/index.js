import validate from './validate.vue';

export default {
    install (Vue) {
        Vue.directive('validate', {
            //params: ['validate-name']
            bind: function (el, binding, vnode, oldVnode) {
                console.log(el);
                debugger;
                console.log(el.attributes['trigger']);
                el.addEventListener('blur', function (e) {
                    console.log(e.target.value);
                });
            },
            update: function (el) {
                console.log(1, el);
            }
        });
        Vue.component(validate.name, validate);
    }
};
