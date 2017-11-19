import Field from './fileld';

export default {
    name: 'validate-form',
    data() {
        return {
            config: {
                // 'length-type': 'eng'
            },
            field: '',
            rule: '',
        };
    },
    methods: {
        configInit(attrs) {
            const {
                config = {},
                lengthType = 'eng',
                parent,
            } = attrs;
            config.lengthType = config.lengthType || lengthType;
            config.$parent = parent || this.$vnode.context;
            this.config = config;
        },
        ruleInit(attrs) {
            const { rule } = attrs;
            this.rule = rule;
        },
        validateAll() {
            return this.field.validateAll();
        },
    },
    mounted() {
        const components = this.$slots.default;
        const { attrs } = this.$vnode.data;
        // const attrs = this.$vnode.data.attrs;
        this.configInit(attrs);
        this.ruleInit(attrs);
        this.field = new Field(components, this);
    },
};
