import Validator from './validator.js';

export default (Vue, options = {}) => {
    const mixin = {};
    //console.log(Vue.util);

    mixin.beforeCreate = function () {
        // children中有validate-form才添加
        this.$validator = new Validator(this);
        //if (! this.$options.computed) {
        //    this.$options.computed = {};
        //}

        //this.$options.computed['errors'] = function errorBagGetter () {
        //    return new Set();
        //    return this.$validator.errors;
        //};
    };

    mixin.created = function () {
        // console.log(this.$options.name);
    };

    mixin.beforeDestory = function () {
    };

    Vue.mixin(mixin);
};
