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
        background: #f5f5f5;
    }

    @media (min-width: 768px){
        #app{
            max-width: 768px;
            margin: 0 auto;
        }
    }
    @media (max-width: 768px) {
        #app{
            max-width: 500px;
            margin: 0 auto;
        }
    }
</style>
