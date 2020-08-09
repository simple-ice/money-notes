<template>
    <label class="remark">
        <span class="name">备注</span>
        <input v-model="value" type="text" placeholder="在这里添加备注"/>
    </label>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';

    @Component
    export default class Remark extends Vue {
        value = '';
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