<template>
    <div v-bind:class="['selecter', {active: status}]" @click="toggle" @blur="status = false" tabIndex=1>
        <span class="input" v-if="cur">{{cur}}</span>
        <span class="input" v-else>{{label}}</span>
        <ul class="select-options" :style="{'top': - height + 'px'}">
            <li v-for="(item, index) of options"
                :value="item[value]"
                @click="changeCur(item)"
                class="select-option">
                {{item[valueString]}}
            </li>
        </ul>
    </div>
</template>
<style scoped src="./selecter.css">
</style>
<script src="./selecter.js">
</script>
