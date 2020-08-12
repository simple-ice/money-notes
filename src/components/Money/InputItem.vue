<template>
    <label class="inputItem">
        <span class="name">{{this.fieldName}}</span>
        <input :value="value"
               @input="onValueChange($event.target.value)"
               type="text" :placeholder="this.placeholder"/>
    </label>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop, Watch} from 'vue-property-decorator';

    @Component
    export default class InputItem extends Vue {
        @Prop({default: ''}) readonly value!: string;
        @Prop({required: true}) fieldName!: string;
        @Prop(String) placeholder?: string;

        @Watch('value')
        onValueChange(value: string) {
            this.$emit('update:value', value);
        }
    }
</script>

<style lang="scss" scoped>
    .inputItem {
        width: 100%;
        font-size: 14px;
        padding-left: 16px;
        display: flex;
        align-items: center;

        .name {
            padding-right: 16px;
        }

        > input {
            height: 100%;
            flex-grow: 1;
            padding-right: 16px;
            background: transparent;
            border: none;
        }
    }
</style>