<template>
    <ul class="types">
        <li class="selected">支出</li>
        <li>收入</li>
    </ul>
</template>

<script lang="ts">
    export default {
        name: 'Types'
    };
</script>

<style lang="scss" scoped>
    .types{
        width: 100%;
        font-size: 24px;
        display: flex;
        text-align: center;
        > li {
            background: #C4C4C4;
            width: 50%;
            height: 73px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            &.selected::after{
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: #333;
            }
        }
    }
</style>