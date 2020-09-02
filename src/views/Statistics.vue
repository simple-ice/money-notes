<template>
    <Layout class="wrap">
        <div class="titleName">
            <span>收支明细</span>
        </div>
        <div class="progressLists">
            <div class="final">
                <span class="finalTitle">累计结余</span>
                <span class="finalNumber">￥{{finalNumber.total}}</span>
            </div>
            <div class="pay">
                <div>
                    <span class="amountName">总计支出</span>
                    <span class="amount">￥{{finalNumber.spend}}</span>
                </div>
                <div>
                    <span class="amountName">总计收入</span>
                    <span class="amount">￥{{finalNumber.income}}</span>
                </div>
            </div>
        </div>
        <Tabs class-prefix="stats" :data-tabs="moneyTypeList" :selectedValue.sync="moneyType"/>
        <ol v-if="dataList.length>0">
            <li class="dataList" v-for="(group,index) in dataList" :key="index">
                <h3 class="title"><span>{{timeTitle(group.title)}}</span></h3>
                <ol class="groupList">
                    <li @click="showDetails(item)" v-for="item in group.items" :key="item.id">
                        <div class="textWrap">
                            <span class="tag">{{tagString(item.tags)}}</span>
                            <span class="remark">{{item.remark}}</span>
                        </div>
                        <span>￥{{item.amount}}</span>
                    </li>
                </ol>
                <div class="groupTotal">
                    总计： <span>{{moneyType + '￥' + group.total}}</span>
                </div>
            </li>
        </ol>
        <div v-else class="noData">
            您还没有记录，赶快去记一笔吧~
        </div>
        <div class="mask" v-if="isShowDetails" @click="isShowDetails=!isShowDetails"></div>
        <Details v-if="isShowDetails" :record="selectRecord" :isShowDetails.sync="isShowDetails"/>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import moneyTypeList from '@/constants/moneyTypeList';
    import dayjs from 'dayjs';
    import clone from '@/lib/clone';
    import Details from '@/components/Statistics/Details.vue';

    @Component({
        components: {Details, Tabs}
    })
    export default class Statistics extends Vue {
        moneyType = '-';
        moneyTypeList = moneyTypeList;
        dayjs = dayjs;
        isShowDetails = false;
        selectRecord!: RecordItem;

        get finalNumber() {
            const finalNumber: {
                spend: number;
                income: number;
                total: number;
            } = {spend: 0,income: 0, total: 0};
            for (let i = 0; i < this.recordList.length; i++) {
                const num = this.recordList[i].amount;
                if (this.recordList[i].type === '+') {
                    finalNumber.total = this.add(finalNumber.total, num);
                    finalNumber.income = this.add(finalNumber.income, num);
                } else {
                    finalNumber.total = parseFloat(this.subtract(finalNumber.total, num));
                    finalNumber.spend = parseFloat(this.subtract(finalNumber.spend, num));
                }
            }
            return finalNumber;
        }

        //加法
        add(arg1: number, arg2: number) {
            let r1, r2;
            try {
                r1 = arg1.toString().split('.')[1].length;
            } catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split('.')[1].length;
            } catch (e) {
                r2 = 0;
            }
            const m = Math.pow(10, Math.max(r1, r2));
            return (arg1 * m + arg2 * m) / m;
        }

        //减法
        subtract(arg1: number, arg2: number) {
            let r1, r2;
            try {
                r1 = arg1.toString().split('.')[1].length;
            } catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split('.')[1].length;
            } catch (e) {
                r2 = 0;
            }
            const m = Math.pow(10, Math.max(r1, r2));
            const n = (r1 >= r2) ? r1 : r2;
            return ((arg1 * m - arg2 * m) / m).toFixed(n);
        }

        get recordList() {
            return (this.$store.state as RootState).recordList;
        }

        get dataList() {
            const {recordList} = this;
            if (recordList.length === 0) {
                return [] as Result;
            }
            const newList = clone(recordList)
                .filter(r => r.type === this.moneyType)
                .sort((x, y) => dayjs(y.createAt).valueOf() - dayjs(x.createAt).valueOf());

            if (newList.length === 0) {
                return [];
            }
            type Result = {
                title: string;
                total?: number;
                items: RecordItem[];
            }[];
            const result: Result = [{title: dayjs(newList[0].createAt).format('YYYY-MM-DD'), items: [newList[0]]}];
            for (let i = 1; i < newList.length; i++) {
                const current = newList[i];
                const last = result[result.length - 1];
                if (dayjs(last.title).isSame(dayjs(current.createAt), 'day')) {
                    last.items.push(current);
                } else {
                    result.push({title: dayjs(current.createAt).format('YYYY-MM-DD'), items: [current]});
                }
            }
            result.map(group => {
                group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
            });
            return result;
        }

        beforeCreate() {
            this.$store.commit('fetchRecords');
        }

        tagString(tags: Tag[]) {
            return tags.length === 0 ? '无' : tags.map(t => t.name).join('，');
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

        showDetails(item: RecordItem) {
            this.isShowDetails = !this.isShowDetails;
            this.selectRecord = item;
        }

    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/styles/helps.scss";

    .titleName {
        margin: 10px;

        > span {
            font-size: 18px;
            border-bottom: 2px solid $color-highlight;
        }
    }

    .progressLists {
        background: white;
        padding: 10px 30px;
        border: 1px solid #333333;
        border-radius: 18px;
        margin: 10px;

        .final {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .finalTitle {
                font-weight: bold;
            }

            .finalNumber {
                font-size: 20px;
                color: #f4647b;
            }
        }

        .pay {
            display: flex;
            border-top: 1px solid #b7b2b2;

            > div {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                /*justify-content: space-between;*/
                align-items: center;

                > span {
                    font-size: 14px;
                }

                .amountName{
                    padding: 5px 0;
                }
                .amount {
                    font-weight: bold;
                }
            }
        }
    }

    .mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, .5);
    }

    .noData {
        font-size: 20px;
        padding: 30px;
        text-align: center;
    }

    ::v-deep {
        .tabs {
            justify-content: flex-end;
            background: white;
            padding: 0 16px;
            margin: 5px 0;
        }

        .stats-tabs-item {
            margin-right: 14px;
            border-radius: 18px;
            width: auto;
            height: auto;
            background: none;
            font-size: 18px;
            padding: 10px 0;
            &.selected {
                color: $color-highlight;

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

    .dataList {
        border-top: 5px solid #f3f3f3;
        background: white;
        .title {
            @extend %item;
            >span{
                border-bottom: 2px solid #c1d1ea;
            }
        }

        .groupList {
            background: white;

            > li {
                @extend %item;
                border-bottom: 1px solid #f3f3f3;
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
            }
        }
        .groupTotal{
            padding: 4px 16px;
            text-align: right;
            border-top: 1px solid #f5f5f5;

        }
    }

</style>