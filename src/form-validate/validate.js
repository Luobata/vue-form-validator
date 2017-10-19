import Field from './fileld.js';

export default {
    name: 'validate-form',
    data () {
        return {
            filed: ''
        };
    },
    mounted () {
        const components = this.$slots.default;
        this.field = new Field(components, this);
    }
};
