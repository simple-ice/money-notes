<template>
    <Layout class-prefix="money">
        <Tags />
        <Remark/>
        <Types/>
        <Calculator/>
    </Layout>
</template>

<script lang="ts">
    import Tags from '@/views/Money/Tags.vue';
    import Remark from '@/views/Money/Remark.vue';
    import Types from '@/views/Money/Types.vue';
    import Calculator from '@/views/Money/Calculator.vue';
    export default {
        name: 'Money',
        components: {Calculator, Types, Remark, Tags}
    };
</script>

<style lang="scss">
    .money-content{
        display: flex;
        align-content: flex-end;
        flex-wrap: wrap;
    }
</style>
