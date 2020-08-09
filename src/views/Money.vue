<template>
    <Layout class-prefix="money">
        <Tags :data-tags.sync="tags" @update:selected="onUpdateTags"/>
        <Remark @update:value="onUpdateRemark"/>
        <Types :value.sync="record.type"/>
        <Calculator :value.sync="record.amount" @submit="saveRecord"/>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Watch} from 'vue-property-decorator';

    import Tags from '@/views/Money/Tags.vue';
    import Remark from '@/views/Money/Remark.vue';
    import Types from '@/views/Money/Types.vue';
    import Calculator from '@/views/Money/Calculator.vue';

    const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    type Record = {
        tags: string[];
        remark: string;
        type: string;
        amount: number;
        createAt?: Date;
    }

    @Component({
        components: {Calculator, Types, Remark, Tags}
    })
    export default class Money extends Vue {
        tags = ['衣', '食', '住', '行'];
        recordList: Record[] = recordList;
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

        saveRecord() {
            const deepClone: Record = JSON.parse(JSON.stringify(this.record));
            deepClone.createAt = new Date();
            this.recordList.push(deepClone);
        }

        @Watch('recordList')
        onRecordListChange() {
            window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
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
