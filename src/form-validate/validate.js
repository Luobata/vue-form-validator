import Field from './fileld.js';

export default {
    name: 'validate-form',
    data () {
        return {
            config: {
                //'length-type': 'eng'
            },
            field: '',
            rule: '',
        };
    },
    methods: {
        configInit (attrs) {
            const config = attrs['config'];
            const lengthType = attrs['length-type'];
            //this.config['length-type'] = lengthType || this.config['length-type'];
            config.lengthType = config.lengthType || lengthType;
            this.config = config;
        },
        ruleInit (attrs) {
            const rule = attrs.rule;
            this.rule = rule;
        },
        validateAll () {
            this.field.validateAll();
        },
    },
    mounted () {
        const components = this.$slots.default;
        const attrs = this.$vnode.data.attrs;
        this.configInit(attrs);
        this.ruleInit(attrs);
        this.field = new Field(components, this);
    },
};
