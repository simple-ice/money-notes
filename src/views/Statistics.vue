<template>
    <Layout>
        <Tabs class-prefix="stats" :data-tabs="moneyTypeList" :selectedValue.sync="moneyType"/>
        <Tabs class-prefix="period" :data-tabs="periodList" :selectedValue.sync="period"/>
        <div>
            <ol>
                <li v-for="(group,index) in result" :key="index">
                    <h3>{{group.title}}</h3>
                    <ol>
                        <li v-for="item in group.items" :key="item.id">
                            {{item.amount}} {{item.createAt}}
                        </li>
                    </ol>
                </li>
            </ol>
        </div>
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
        get recordList() {
            return (this.$store.state as RootState).recordList;
        }

        get result() {
            const {recordList} = this;
            type HashTableValue = {
                title: string;
                items: RecordList[];
            }
            const hashTable: {[key: string]: HashTableValue} = {};
            for (const element of recordList) {
                if (element.createAt) {
                    const [date, time] = element.createAt.split('T');
                    hashTable[date] = hashTable[date] || {title: date, items: []};
                    hashTable[date].items.push(element);
                }
            }
            console.log(hashTable);
            return hashTable;
        }

        beforeCreate() {
            this.$store.commit('fetchRecords');
        }

        moneyType = '-';
        period = 'day';
        periodList = periodList;
        moneyTypeList = moneyTypeList;
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
</style>