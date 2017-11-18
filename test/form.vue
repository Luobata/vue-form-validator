<template>
    <div>
        <validate-form ref="form" length-type="eng" :rule="rule" :config="config">
            <div> 
                <input validate-name="input2" min="5" required trigger="blur;$sel.change"/>
                <selects validate-name="sel" v-model="test.data" :options="options" v-bind:min="data"></selects>
                <input v-model="text" v-validate min="5" max="10" trigger="blur" phone/>
                <span v-show="errors.input2">{{ errors.input2Error }}</span>
                <input v-model="text" v-validate trigger="blur" email/>
                <input v-model="positive" v-validate trigger="blur" positive/>
                <input v-model="Positive" v-validate trigger="blur" Positive/>
                <input v-model="negative" v-validate trigger="blur" negative/>
                <input v-model="Negative" v-validate trigger="blur" Negative/>
            </div>
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
        name: 'abc',
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
                name: 'abcd',
                errors: {},
                config: {
                    lengthType: 'chi',
                },
                rule: {
                    validate: {
                        input2: {
                            text: '这是一句默认的错误提示',
                            trigger: '$input.blur',
                            config: {
                                lengthType: 'eng'
                            },
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
                            trigger: 'change;$input2.blur',
                            min: 3
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
                positive: '测试positvie(含0正数)',
                Positive: '测试Positive(不含0正数)',
                negative: '测试negative(含0负数)',
                Negative: '测试Negative(不含0负数)',
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
                data: 2,
                test: {
                    data: 1
                }
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
