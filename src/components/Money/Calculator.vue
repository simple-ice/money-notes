<template>
    <div class="calculator">
        <div class="number">{{outPut}}</div>
        <div class="numberPad">
            <button @click="inputContent">1</button>
            <button @click="inputContent">2</button>
            <button @click="inputContent">3</button>
            <button @click="remove">删除</button>
            <button @click="inputContent">4</button>
            <button @click="inputContent">5</button>
            <button @click="inputContent">6</button>
            <button @click="clear">清空</button>
            <button @click="inputContent">7</button>
            <button @click="inputContent">8</button>
            <button @click="inputContent">9</button>
            <button class="save" @click="save">保存</button>
            <button class="zero" @click="inputContent">0</button>
            <button @click="inputContent">.</button>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

    @Component
    export default class Calculator extends Vue {
        @Prop(Number) readonly value!: number;
        @Prop(Array) readonly tags!: object[];
        outPut: string = this.value.toString();

        inputContent(e: MouseEvent) {
            const button = e.target as HTMLButtonElement;
            const input = button.textContent as string;
            if (this.outPut.length >= 16) {
                return;
            }
            if (this.outPut === '0') {
                if ('0123456789'.indexOf(input) >= 0) {
                    this.outPut = input;
                    return;
                }
            }
            if (this.outPut.indexOf('.') >= 0 && input === '.') {
                return;
            }
            this.outPut += input;

        }

        remove() {
            if (this.outPut.length > 1) {
                this.outPut = this.outPut.slice(0, -1);
            } else {
                this.outPut = '0';
            }
        }

        clear() {
            this.outPut = '0';
        }

        save() {
            if (this.tags.length > 0){
                this.$emit('update:value', parseFloat(this.outPut));
                this.outPut = '0';
            }
            this.$emit('submit');

        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/styles/helps.scss";

    .calculator {
        width: 100%;

        .number {
            @extend %innerShadow;
            font-size: 36px;
            font-family: Consolas, monospace;
            text-align: right;
            padding: 9px 16px;
        }

        .numberPad {
            @extend %clearFix;

            > button {
                float: left;
                width: 25%;
                height: 64px;
                background: transparent;
                border: none;

                &.save {
                    height: 64*2px;
                    float: right;
                }

                &.zero {
                    width: 25%*2;
                }

                $bg: #F2F2F2;

                &:nth-child(1) {
                    background: $bg;
                }

                &:nth-child(2), &:nth-child(5) {
                    background: darken($bg, 6%);
                }

                &:nth-child(3), &:nth-child(6), &:nth-child(9) {
                    background: darken($bg, 4*3%);
                }

                &:nth-child(4), &:nth-child(7), &:nth-child(10) {
                    background: darken($bg, 4*5%);
                }

                &:nth-child(8), &:nth-child(11), &:nth-child(13) {
                    background: darken($bg, 4*7%);
                }

                &:nth-child(14) {
                    background: darken($bg, 4*9%);
                }

                &:nth-child(12) {
                    background: darken($bg, 4*11%);
                }
            }
        }
    }
</style>