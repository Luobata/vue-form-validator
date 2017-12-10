<template lang="pug">
    div
        validate-form(errorName="error2" :config="config")
            input(type="text" v-validate required trigger="blur")
</template>
<script>
    export default {
        data() {
            return {
                error1: {},
                error2: {},
                error3: {},
                config: {
                    errorName: 'error3',
                },
            };
        }
    };
</script>
