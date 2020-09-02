<template>
    <Layout class-prefix="money">
        <Tags @update:selected="onUpdateTags"/>
        <InputItem field-name="备注"
                   placeholder="点击这里输入备注"
                   :value.sync="record.remark"/>
        <Tabs :data-tabs="moneyTypeList" :selected-value.sync="record.type"/>
        <Calculator :tags="record.tags" :value.sync="record.amount" @submit="saveRecord()"/>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';

    import Tags from '@/components/Money/Tags.vue';
    import InputItem from '@/components/Money/InputItem.vue';
    import Calculator from '@/components/Money/Calculator.vue';
    import Tabs from '@/components/Tabs.vue';
    import moneyTypeList from '@/constants/moneyTypeList';


    @Component({
        components: {Tabs, Calculator, InputItem, Tags}
    })
    export default class Money extends Vue {
        record: RecordItem = {
            tags: [],
            remark: '',
            type: '-',
            amount: 0,
            _id: ''
        };
        moneyTypeList = moneyTypeList;

        get recordList() {
            return this.$store.state.recordList;
        }

        created() {
            this.$store.commit('fetchRecords');
        }

        onUpdateTags(value: Tag[]) {
            this.record.tags = value;
        }

        onUpdateRemark(value: string) {
            this.record.remark = value;
        }

        saveRecord() {
            if (!this.record || this.record.tags.length === 0) {
                return window.alert('请至少选择一个标签');
            }
            this.$store.commit('createRecord', this.record);
            window.alert('已保存');
            this.record.remark = '';
            this.record.amount = 0;
        }
    }
</script>

<style lang="scss" scoped>
    ::v-deep {
        .money-content {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        }

        .inputItem {
            background: #f5f5f5;
            height: 73px;
            line-height: 73px;
            width: 100%;
        }
    }

</style>
