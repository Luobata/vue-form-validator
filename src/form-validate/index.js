import validate from './validate.vue';

export default {
    install (Vue) {
        Vue.directive('validate', {
        });
        //Vue.component(validate.name, validate);
        Vue.component('validate-form', validate);
    }
};
