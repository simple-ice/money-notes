<template>
    <Layout class="wrap">
        <Tabs class-prefix="stats" :data-tabs="moneyTypeList" :selectedValue.sync="moneyType"/>
        <Tabs class-prefix="period" :data-tabs="periodList" :selectedValue.sync="period"/>
        <ol>
            <li v-for="group in result" :key="group.title">
                <h3 class="title">{{timeTitle(group.title)}}</h3>
                <ol class="groupList">
                    <li v-for="item in group.items" :key="item.id">
                        <div class="textWrap">
                            <span class="tag">{{tagString(item.tags)}}</span>
                            <span class="remark">{{item.remark}}</span>
                        </div>
                        <span class="createTime">{{dayjs(item.createAt).format('H:mm')}}</span>
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
    import dayjs from 'dayjs';

    @Component({
        components: {Tabs}
    })
    export default class Statistics extends Vue {
        moneyType = '-';
        period = 'day';
        periodList = periodList;
        moneyTypeList = moneyTypeList;
        dayjs = dayjs;

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

        tagString(tags: Tag[]) {
            return tags.length === 0 ? '无' : tags.join(',');
        }

        timeTitle(title: string) {
            const day = dayjs(title);
            const now = dayjs();
            if (day.isSame(now, 'day')) {
                return `${day.format('MM.DD')} 今天`;
            } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
                return `${day.format('MM.DD')} 昨天`;
            } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
                return `${day.format('MM.DD')} 前天`;
            } else if (day.isSame(now, 'year')) {
                return day.format('M月D日');
            } else {
                return day.format('YYYY年M月D日');
            }
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

    %item {
        padding: 0 16px;
        min-height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .title {
        @extend %item;
    }

    .groupList {
        background: white;

        > li {
            @extend %item;

            position: relative;

            .textWrap {
                display: flex;
                flex-direction: column;
                padding: 6px 0;
                width: 40vw;

                .remark {
                    color: #999;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }

            .createTime {
                color: #777;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }
</style>