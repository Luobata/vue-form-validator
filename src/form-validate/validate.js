import bind from './bind.js';

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
        };
    },
    mounted () {
        const components = this.$slots.default;
        console.log(components);
        for (let i of components) {
            if (!i.data) continue;
            const dir = i.data.directives;
            for (let j of dir) {
                if (j.name === 'validate') {
                    console.log(j);
                    bind(i.data.attrs);
                }
            }
        }
        //components[0].
    }
};
