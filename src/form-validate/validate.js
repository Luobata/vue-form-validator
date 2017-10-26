import Field from './fileld.js';

export default {
    name: 'validate-form',
    data () {
        return {
            field: '',
        };
    },
    methods: {
        validateAll () {
            this.field.validateAll();
        },
    },
    mounted () {
        const components = this.$slots.default;
        this.field = new Field(components, this);
    },
};
