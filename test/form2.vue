<template lang="pug">
    div
        validate-form()
            input(type="text" v-validate required trigger="blur")
</template>
<script>
    export default {
        data() {
            return {
                errors: {}
            };
        }
    };
</script>
