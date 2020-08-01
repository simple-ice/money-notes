<template>
    <div id="app">
        <router-view/>
    </div>
</template>

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
    }
</style>
