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
    import recordListModel from '@/models/recordListModel';
    import tagListModel from '@/models/tagListModel';


    const recordList = recordListModel.getData();
    const tagList = tagListModel.getData();

    @Component({
        components: {Calculator, Types, Remark, Tags}
    })
    export default class Money extends Vue {
        tags = tagList;
        recordList: RecordItem[] = recordList;
        record: RecordItem = {
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
            const result = recordListModel.clone(this.record);
            result.createAt = new Date();
            this.recordList.push(result);
        }

        @Watch('recordList')
        onRecordListChange() {
            recordListModel.setData(this.recordList);
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
