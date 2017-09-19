<template>
    <div>
        <validate-form>
            <input validate-name="input" v-model="text" v-validate min="5" max="10" trigger="blur" />
            <input validate-name="input2" v-validate min="5" max="10" trigger="$input.blur" />
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
        data () {
            return {
                text: 123
            }
        },
        methods: {
            changeCity (city) {
                console.log(city);
            }
        }
    };
</script>
