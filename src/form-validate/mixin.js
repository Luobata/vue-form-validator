import Validator from './validator.js';

export default (Vue, options = {}) => {
    const mixin = {};
    console.log(Vue.util);

    mixin.beforeCreate = function () {
        console.log(this);
        this.$validator = new Validator(this)
    };

    mixin.created = function () {
    };

    mixin.beforeDestory = function () {
    };

    Vue.mixin(mixin);
};
