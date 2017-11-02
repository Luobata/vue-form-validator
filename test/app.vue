<template>
    <div id="app">
        <router-link to="/index">index</router-link>
        <router-link to="/index/index2">index2</router-link>
        <router-link to="/other">other</router-link>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<style scoped>
    #app {
        height: 100%;
    }
</style>
<script>
</script>
