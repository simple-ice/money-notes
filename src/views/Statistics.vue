<template>
    <Layout class="wrap">
        <Tabs class-prefix="stats" :data-tabs="moneyTypeList" :selectedValue.sync="moneyType"/>
        <Tabs class-prefix="period" :data-tabs="periodList" :selectedValue.sync="period"/>
        <ol>
            <li v-for="(group,index) in result" :key="index">
                <h3 class="title">{{group.title}}</h3>
                <ol class="groupList">
                    <li v-for="item in group.items" :key="item.id">
                        <span>{{tagString(item.tags)}}</span>
                        <span class="remark">{{item.remark}}</span>
                        <span>￥{{item.amount}}</span>
                    </li>
                </ol>
            </li>
            <li v-for="(group,index) in result" :key="index">
                <h3 class="title">{{group.title}}</h3>
                <ol class="groupList">
                    <li v-for="item in group.items" :key="item.id">
                        <span>{{tagString(item.tags)}}</span>
                        <span class="remark">{{item.remark}}</span>
                        <span>￥{{item.amount}}</span>
                    </li>
                </ol>
            </li>
            <li v-for="(group,index) in result" :key="index">
                <h3 class="title">{{group.title}}</h3>
                <ol class="groupList">
                    <li v-for="item in group.items" :key="item.id">
                        <span>{{tagString(item.tags)}}</span>
                        <span class="remark">{{item.remark}}</span>
                        <span>￥{{item.amount}}</span>
                    </li>
                </ol>
            </li>
        </ol>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import periodList from '@/constants/periodList';
    import moneyTypeList from '@/constants/moneyTypeList';

    @Component({
        components: {Tabs}
    })
    export default class Statistics extends Vue {
        moneyType = '-';
        period = 'day';
        periodList = periodList;
        moneyTypeList = moneyTypeList;
        get recordList() {
            return (this.$store.state as RootState).recordList;
        }
        get result() {
            const {recordList} = this;
            type HashTableValue = {
                title: string;
                items: RecordItem[];
            }
            const hashTable: { [key: string]: HashTableValue } = {};
            for (const element of recordList) {
                if (element.createAt) {
                    const [date, time] = element.createAt.split('T');
                    hashTable[date] = hashTable[date] || {title: date, items: []};
                    hashTable[date].items.push(element);
                }
            }
            return hashTable;
        }
        beforeCreate() {
            this.$store.commit('fetchRecords');
        }

        tagString(tags: Tag[]){
            return tags.length === 0 ? '无' : tags.join(',')
        }

    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/styles/helps.scss";

    ::v-deep {
        .stats-tabs-item {
            &.selected {
                background: $color-highlight;
                color: white;

                &::after {
                    content: none;
                }
            }
        }
        .period-tabs-item {
            height: 48px;
        }
    }

    %item{
        padding: 0 16px;
        min-height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .title{
        @extend %item;
    }
    .groupList{
        background: white;
        > li {
            @extend %item;
            .remark{
                margin-left: 14px;
                margin-right: auto;
                color: #999;
            }
        }
    }
</style>