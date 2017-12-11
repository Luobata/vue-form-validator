<template lang="pug">
    div
        validate-form(errorName="error2" :config="config")
            input(type="text" v-validate required trigger="$$obj.arr.length")
        button.button(@click="pushArr")
</template>
<script>
    export default {
        data() {
            return {
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
            };
        },
        methods: {
            pushArr() {
                this.obj.arr.push(1);
            }
        }
    };
</script>
<style lang="styl">
    .button
        width 20px
        height 20px
        margin-top 20px
        background yellow
</style>
