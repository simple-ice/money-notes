<template>
    <div class="tags">
        <ul class="current">
            <li>衣</li>
            <li>食</li>
            <li>住</li>
            <li>行</li>
        </ul>
        <div class="newTag">
            <button>新增标签</button>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Tags'
    };
</script>

<style lang="scss" scoped>
    .tags{
        width: 100%;
        font-size: 14px;
        padding: 16px;
        overflow: auto;
        .current{
            display: flex;
            flex-wrap: wrap;
            > li{
                background: #D9D9D9;
                $h: 24px;
                height: $h;
                line-height: $h;
                border-radius: $h/2;
                padding: 0 16px;
                margin-right: 12px;
                margin-top: 10px;
            }
        }
        .newTag{
            padding-top: 16px;
            > button{
                background: transparent;
                border: none;
                border-bottom: 1px solid;
                padding: 0 4px;
                color: #999999;
            }
        }
    }
</style>