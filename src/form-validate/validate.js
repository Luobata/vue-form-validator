import Field from './fileld.js';

export default {
    name: 'validate-form',
    data () {
        return {
            config: {
                'length-type': 'eng'
            },
            field: '',
        };
    },
    methods: {
        configInit () {
            const attrs = this.$vnode.data.attrs;
            const lengthType = attrs['length-type'];
            this.config['length-type'] = lengthType || this.config['length-type'];
        },
        validateAll () {
            this.field.validateAll();
        },
    },
    mounted () {
        const components = this.$slots.default;
        this.configInit();
        this.field = new Field(components, this);
    },
};
