<template>
    <div>
        <validate-form>
            <selects v-model="data" :options="options" v-validate trigger="ch"></selects>
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
    import selects from './selects/selecter.vue';

    export default {
        components: {
            selects
        },
        data () {
            return {
                text: 123,
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
        }
    };
</script>
