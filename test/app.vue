<template>
    <div>
        <validate-form>
            <selects v-model="data" :options="options" v-validate trigger="change" v-if="a" v-bind:min="data"></selects>
            <input validate-name="input" v-model="text" v-validate min="5" max="10" trigger="blur" />
            <input validate-name="input2" v-validate min="5" max="10" trigger="$input.blur" />
            <span v-show="errors.has('data')">123</span>
        </validate-form>
        <!--
        <div class="column is-12">
            <label class="label" for="email">Email</label>
            <p :class="{ 'control': true }">
            <input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" placeholder="Email">
            <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            </p>
        </div>
        -->
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
                errors: new Set(),
                text: 123,
                a: true,
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
