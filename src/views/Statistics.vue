<template>
    <Layout class="wrap">
        <Tabs class-prefix="stats" :data-tabs="moneyTypeList" :selectedValue.sync="moneyType"/>
        <ol v-if="dataList.length>0">
            <li class="dataList" v-for="(group,index) in dataList" :key="index">
                <h3 class="title">{{timeTitle(group.title)}}<span style="font-weight: bold">￥{{group.total}}</span></h3>
                <ol class="groupList">
                    <li @click="showDetails(item)" v-for="item in group.items" :key="item.id">
                        <div class="textWrap">
                            <span class="tag">{{tagString(item.tags)}}</span>
                            <span class="remark">{{item.remark}}</span>
                        </div>
                        <span>￥{{item.amount}}</span>
                    </li>
                </ol>
            </li>
        </ol>
        <div v-else class="noData">
            您还没有记录，赶快去记一笔吧~
        </div>
        <transition-group name="fade">
            <div key="mask-fade" class="mask" v-if="isShowDetails" @click="isShowDetails=!isShowDetails"></div>
            <Details key="details-fade" v-if="isShowDetails" :record="selectRecord" :isShowDetails.sync="isShowDetails"/>
        </transition-group>
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
        selectRecord!: RecordItem ;

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

        showDetails(item: RecordItem){
            this.isShowDetails = !this.isShowDetails;
            this.selectRecord = item;
        }

    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/styles/helps.scss";
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
    .mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, .5);
    }
    .noData{
        font-size: 20px;
        padding: 30px;
        text-align: center;
    }

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

    .dataList {
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
            }
        }
    }

</style>