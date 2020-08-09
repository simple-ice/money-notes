<template>
    <Layout class-prefix="money">
        {{record}}
        <Tags :data-tags.sync="tags" @update:selected="onUpdateTags"/>
        <Remark @update:value="onUpdateRemark"/>
        <Types :value.sync="record.type"/>
        <Calculator :value.sync="record.amount"/>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';

    import Tags from '@/views/Money/Tags.vue';
    import Remark from '@/views/Money/Remark.vue';
    import Types from '@/views/Money/Types.vue';
    import Calculator from '@/views/Money/Calculator.vue';

    type Record = {
        tags: string[];
        remark: string;
        type: string;
        amount: number;
    }

    @Component({
        components: {Calculator, Types, Remark, Tags}
    })
    export default class Money extends Vue {
        tags = ['衣', '食', '住', '行'];
        record: Record = {
            tags: [],
            remark: '',
            type: '-',
            amount: 0
        };

        onUpdateTags(value: string[]) {
            this.record.tags = value;
        }

        onUpdateRemark(value: string) {
            this.record.remark = value;
        }

    }
</script>

<style lang="scss">
    .money-content {
        display: flex;
        align-content: flex-end;
        flex-wrap: wrap;
    }
</style>
