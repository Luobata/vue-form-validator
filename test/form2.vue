<template lang="pug">
    div
        validate-form(errorName="error2")
            input(type="text" v-validate required trigger="$$obj.arr.length")
            input(type="text" validate-name="a" required trigger="$$obj.arr.length")
            selects(v-validate v-model="test" :options="options" trigger="change" min="5")
        validate-form(errorName="error3" :config="config")
            input(type="text" validate-name="a" required trigger="$$obj.arr.length")
        button.button(@click="pushArr")
</template>
<script>
    import selects from './selects/selecter.vue';
    export default {
        data() {
            return {
                test: 1,
                obj: {
                    arr: []
                },
                arr: [],
                error1: {},
                error2: {},
                error3: {},
                config: {
                    errorName: 'error3',
                },
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
            };
        },
        methods: {
            pushArr() {
                this.obj.arr.push(1);
            }
        },
        components: {
            selects
        },
    };
</script>
<style lang="styl">
    .button
        width 20px
        height 20px
        margin-top 20px
        background yellow
</style>
