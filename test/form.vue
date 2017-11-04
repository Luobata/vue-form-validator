<template>
    <div>
        <validate-form ref="form" length-type="eng" :rule="rule">
            <input validate-name="input2" v-validate min="5" required trigger="blur;$sel.change"/>
            <selects validate-name="sel" v-model="data" :options="options" v-validate v-if="a" v-bind:min="data" trigger=""></selects>
            <input validate-name="input" v-model="text" v-validate min="5" max="10" trigger="blur" />
            <span v-show="errors.input2">{{ errors.input2Error }}</span>
        </validate-form>
    </div>
</template>
<style scoped>
    #app {
        height: 100%;
    }
</style>
<script>
    import selects from './selects/selecter.vue';

    export default {
        watch: {
            data: function (val) {
                console.log(val);
            }
        },
        components: {
            selects
        },
        data () {
            return {
                errors: {},
                rule: {
                    validate: {
                        input2: {
                            text: '这是一句默认的错误提示',
                            trigger: '$input.blur',
                            min: 6, // 可以是int or string
                            max: {
                                text: '超过最大值',
                                value: function () {
                                    if (this.d > 30) {
                                        return 10;
                                    } else {
                                        return 15;
                                    }
                                }
                            },
                            required: '',
                            maxlength: {
                                value: 4,
                                text: '超过最大长度'
                            },
                            minlength: 'dd' // 错误的值
                        },
                        sel: {
                            text: 'selectts的错误提示',
                            //trigger: 'change;$input2.blur', // trigger 没有覆盖回去 bug！
                            min: 0
                        }
                    },
                    data: {
                        b: {
                            text: '这是一句无关dom的错误提示',
                            trigger: '$input2.blur',
                            min: 5,
                            max: 9,
                        },
                        /*c: {
                            text: '关于c的错误提示',
                            trigger: '$$data.change',
                            max: 20,
                        },*/
                    }
                },
                text: 123,
                a: true,
                b: 11,
                c: 22,
                d: 33,
                options: [
                    {
                        key: 1,
                        value: 123
                    },
                    {
                        key: 2,
                        value: 234
                    }
                ],
                data: 2
            }
        },
        methods: {
            changeCity (city) {
                console.log(city);
            }
        },
        mounted () {
            const form = this.$refs['form'];
            // form.validateAll();
        },
    };
</script>
