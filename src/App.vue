<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Component} from 'vue-property-decorator';
    import store from '@/store/index2';
    @Component
    export default class App extends Vue{
        store = store
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/helps.scss";
    @import "~@/assets/styles/reset.scss";

    #app {
        font-family: $font-hei;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: 1.5;
        color: #333;
        font-size: 16px;
        background: #f5f5f5;
    }
</style>
