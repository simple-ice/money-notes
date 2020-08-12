<template>
    <button><slot/></button>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';

    @Component
    export default class Button extends Vue {

    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/styles/helps.scss";
    button {
        background: $color-highlight;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        height: 40px;
        padding: 0 16px;
    }
</style>