import Field from './fileld.js';

export default {
    name: 'validate-form',
    //directives: {
    //    validate: {
    //        inserted: function (el) {
    //            console.log(el);
    //        }
    //    }
    //},
    data () {
        return {
            filed: ''
        };
    },
    mounted () {
        const components = this.$slots.default;
        this.field = new Field(components, this);
        debugger;
        console.log(components);
    }
};
