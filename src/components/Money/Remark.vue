<template>
    <label class="remark">
        <span class="name">{{this.fieldName}}</span>
        <input v-model="value" type="text" :placeholder="this.placeholder"/>
    </label>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop, Watch} from 'vue-property-decorator';

    @Component
    export default class Remark extends Vue {
        value = '';
        @Prop({required: true}) fieldName!: string;
        @Prop(String) placeholder?: string;

        @Watch('value')
        onValueChange(value: string) {
            this.$emit('update:value', value);
        }
    }
</script>

<style lang="scss" scoped>
    .remark {
        width: 100%;
        font-size: 14px;
        background: #f5f5f5;
        padding-left: 16px;
        display: flex;
        align-items: center;

        .name {
            padding-right: 16px;
        }

        > input {
            height: 73px;
            flex-grow: 1;
            padding-right: 16px;
            background: transparent;
            border: none;
        }
    }
</style>