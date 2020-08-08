<template>
    <ul class="types">
        <li :class="type === '-' && 'selected' " @click="selectType('-')">支出</li>
        <li :class=" type === '+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';

    @Component
    export default class Types extends Vue {
        type = '-';

        selectType(type: string) {
            if (type !== '-' && type !== '+') {
                throw new Error('type is unknown');
            }
            this.type = type;
        }
    }
</script>

<style lang="scss" scoped>
    .types {
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

            &.selected::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: #333;
            }
        }
    }
</style>