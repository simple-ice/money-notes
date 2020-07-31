<template>
    <div class="nav-wrap">
        <div class="content">
            <slot />
        </div>
        <Nav />
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Layout'
    };
</script>

<style lang="scss" scoped>
    .nav-wrap{
        border: 1px solid cornflowerblue;
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .content{
        border: 1px solid green;
        flex-grow: 1;
        overflow: auto;
    }
</style>