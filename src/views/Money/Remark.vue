<template>
    <label class="remark">
        <span class="name">备注</span>
        <input type="text" placeholder="在这里添加备注">
    </label>
</template>

<script lang="ts">
    export default {
        name: 'Remark'
    };
</script>

<style lang="scss" scoped>
    .remark{
        width: 100%;
        font-size: 14px;
        background: #f5f5f5;
        padding-left: 16px;
        display: flex;
        align-items: center;
        .name{
            padding-right: 16px;
        }
        > input{
            height: 73px;
            flex-grow: 1;
            padding-right: 16px;
            background: transparent;
            border: none;
        }
    }
</style>