<template>
    <Layout>
        <ol class="tags">
            <li><span>衣</span>
                <Icon name="right"/>
            </li>
            <li><span>食</span>
                <Icon name="right"/>
            </li>
            <li><span>住</span>
                <Icon name="right"/>
            </li>
            <li><span>行</span>
                <Icon name="right"/>
            </li>
        </ol>
        <div class="createTag">
            <button>新建标签</button>
        </div>
    </Layout>
</template>

<script lang="ts">
    export default {
        name: 'Labels'
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/styles/helps.scss";
    .tags {
        background: white;
        padding-left: 16px;
        > li {
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2px solid #e6e6e6;
            svg{
                margin-right: 12px;
            }
        }
    }
    .createTag{
        text-align: center;
        margin-top: 44px;
        > button{
            background: $color-highlight;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            height: 40px;
            padding: 0 16px;
        }
    }
</style>