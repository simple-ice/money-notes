<template>
    <nav>
        <router-link to="/money" class="item" active-class="selected">
            <Icon name="edit" />记账
        </router-link>
        <router-link to="/labels" class="item" active-class="selected">
            <Icon name="label"/>标签
        </router-link>
        <router-link to="/statistics" class="item" active-class="selected">
            <Icon name="statistics"/>统计
        </router-link>
    </nav>
</template>

<script lang="ts">

    export default {
        name: 'Nav'
    };
</script>

<style lang="scss" scoped>
    nav{
        display: flex;
        box-shadow: 0 0 3px rgba(0,0,0,.3);
        flex-direction: row;
        font-size: 12px;

        .item{
            width: 33.3333%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .icon{
                width: 30px;
                height: 30px;
            }
        }
        > .item.selected{
            color: cornflowerblue;
        }
    }
</style>