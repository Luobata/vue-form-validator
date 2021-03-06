import Field from './fileld';

export default {
    name: 'validate-form',
    data() {
        return {
            config: {
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
                floatLengthType = 'normal',
                errorName = '',
                parent,
            } = attrs;
            config.lengthType = config.lengthType || lengthType;
            config.floatLengthType = config.floatLengthType || floatLengthType;
            config.errorName = config.errorName || errorName;
            config.$parent = parent || this.$vnode.context;
            this.config = config;
        },
        ruleInit(attrs) {
            const { rule = {} } = attrs;
            this.rule = rule;
        },
        validateAll() {
            return this.field.validateAll();
        },
    },
    mounted() {
        const components = this.$slots.default;
        const { attrs = {} } = this.$vnode.data;

        this.configInit(attrs);
        this.ruleInit(attrs);
        if (components) this.field = new Field(components, this);
    },
    destroyed() {
        this.field.removeListener();
    },
    deactivated() {
    },
};
