<template>
    <Layout class-prefix="money">
        <Tags :data-tags.sync="tags" @update:selected="onUpdateTags" />
        <div class="remake">
            <InputItem field-name="备注" placeholder="点击这里输入备注" @update:value="onUpdateRemark"/>
        </div>
        <Types :value.sync="record.type"/>
        <Calculator :value.sync="record.amount" @submit="saveRecord"/>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';

    import Tags from '@/components/Money/Tags.vue';
    import InputItem from '@/components/Money/InputItem.vue';
    import Types from '@/components/Money/Types.vue';
    import Calculator from '@/components/Money/Calculator.vue';
    import store from '@/store/index2';


    @Component({
        components: {Calculator, Types, InputItem, Tags}
    })
    export default class Money extends Vue {
        tags = store.tagList;
        recordList = store.recordList;
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
            store.createRecord(this.record);
        }
    }
</script>

<style lang="scss">
    .money-content {
        display: flex;
        align-content: flex-end;
        flex-wrap: wrap;
    }

    .remake {
        background: #f5f5f5;
        height: 73px;
        line-height: 73px;
    }
</style>
