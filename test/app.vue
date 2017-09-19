<template>
    <div>
        <validate-form>
            <input v-id="input" v-validate min="5" max="10" trigger="blur" />
            <input v-id="input2" v-validate min="5" max="10" trigger="$input.blur" />
        </validate-form>
    </div>
</template>
<style scoped>
    #app {
        height: 100%;
    }
</style>
<script>
    export default {
        methods: {
            changeCity (city) {
                console.log(city);
            }
        }
    };
</script>
