<template>
    <ul class="tabs">
        <li v-for="tab in dataTabs" :key="tab.value"
            class="tabs-item"
            :class="{selected: tab.value === selectedValue,
            [classPrefix+ '-tabs-item']: classPrefix}"
            @click="select(tab)"
        >{{tab.text}}
        </li>
    </ul>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

    type DataTabItem = {
        text: string; value: string;
    }
    @Component
    export default class Tabs extends Vue {
        @Prop({required: true, type: Array}) dataTabs!: DataTabItem[];
        @Prop(String) readonly selectedValue!: string;
        @Prop(String) readonly classPrefix?: string;

        select(tab: DataTabItem) {
            this.$emit('update:selectedValue', tab.value)
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/styles/helps.scss";

    .tabs {
        width: 100%;
        font-size: 24px;
        display: flex;
        text-align: center;

        &-item {
            background: #C4C4C4;
            width: 50%;
            height: 73px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

            &.selected {
                color: $color-highlight;

                &::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: $color-highlight;
                }
            }

        }
    }
</style>