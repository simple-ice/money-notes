<template>
    <Layout>
        <div class="detail-wrap">
            <Tabs :data-tabs="moneyTypeList" :selected-value.sync="moneyType"/>
            <div class="chart-line">
                <span class="titleName">本月{{moneyType === '-' ? '支出' : '收入'}}走势</span>
                <div class="lineBox">
                    <Chart class="line" :options="chartLineOptions" ref="chartLine"/>
                </div>
            </div>
            <div class="chart-pie">
                <span class="titleName">分类占比</span>
                <Chart :options="chartPieOptions"/>
            </div>

        </div>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import moneyTypeList from '@/constants/moneyTypeList.ts';
    import Chart from '@/components/Chart.vue';
    import clone from '@/lib/clone';
    import dayjs from 'dayjs';
    import {accAdd} from '@/lib/operation';

    interface DetailPointArray {
        date: string;
        value: string;
    }

    interface CategoryArray {
        name: string;
        value: string;
    }

    @Component({
        components: {Chart, Tabs}
    })
    export default class Detail extends Vue {
        moneyTypeList = moneyTypeList;
        moneyType = '-';

        beforeCreate() {
            this.$store.commit('fetchRecords');
        }

        mounted() {
            const div = (this.$refs.chartLine as HTMLDivElement);
            div.scrollLeft = div.scrollWidth;
        }

        get recordList() {
            return (this.$store.state as RootState).recordList;
        }

        get keyValueList() {
            const copyRecordList = clone(this.recordList)
                .filter(r => r.type === this.moneyType)
                .sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());

            const array: DetailPointArray[] = [];

            //按照当前月份进行循环
            for (let i = 1; i <= dayjs().daysInMonth(); i++) {
                const dateMonth = dayjs().date(i).format('YYYY-MM-DD');
                //判断数据是否在同一天，如果在同一天则组成数组保存
                const arr = copyRecordList.filter((record) => {
                    return dayjs(record.createAt).format('YYYY-MM-DD') === dateMonth;
                });
                if (arr.length > 1) {
                    let num = 0;
                    for (let j = 0; j < arr.length; j++) {
                        num += arr[j].amount;
                    }
                    array.push({
                        'date': dateMonth,
                        'value': num.toFixed(2)
                    });
                } else {
                    array.push({
                        'date': dateMonth,
                        'value': arr.length === 0 ? '0' : arr[0].amount.toFixed(2)
                    });
                }

            }
            return array;
        }

        get chartLineOptions() {
            const keys = this.keyValueList.map((item) => item.date);
            const values = this.keyValueList.map((item) => item.value);
            return {
                grid: {
                    left: 0,
                    right: 0,
                    top: 0
                },
                xAxis: {
                    type: 'category',
                    data: keys,
                    axisTick: {alignWithLabel: true},
                    axisLine: {lineStyle: {color: '#666'}},
                    axisLabel: {
                        formatter: function (value: string) {
                            return dayjs(value).format('M-DD');
                        }
                    },
                },
                yAxis: {
                    type: 'value',
                    show: false
                },
                series: [{
                    symbol: 'circle',
                    symbolSize: 12,
                    itemStyle: {borderWidth: 1, color: '#6495ed', borderColor: '#666'},
                    // lineStyle: {width: 10},
                    data: values,
                    type: 'line'
                }],
                tooltip: {
                    show: true,
                    position: 'left',
                    formatter: '{c}'
                }
            };
        }


        get tagsList() {
            const copyRecordList = clone(this.recordList)
                .filter(r => r.type === this.moneyType)
                .sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());

            const tagsMap = new Map();
            for (let i = 0; i < copyRecordList.length; i++) {
                const tagName = copyRecordList[i].tags[0].name;
                const tagAmount = copyRecordList[i].amount;
                if (tagsMap.has(tagName)) {
                    const num = accAdd(tagsMap.get(tagName), tagAmount).toFixed(2);
                    tagsMap.set(tagName, num);
                } else {
                    tagsMap.set(tagName, tagAmount.toFixed(2));
                }
            }
            return tagsMap;
        }

        get chartPieOptions() {
            const tagsName: string[] = [];
            const tagAmountData: object[] = [];
            this.tagsList.forEach((value, key) => {
                tagsName.push(key)
                tagAmountData.push({name: key,value})
            })
            return {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'horizontal',
                    top: 'auto',
                    data: tagsName
                },
                series: [
                    {
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: tagAmountData,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        label: {
                            position: 'outer',
                            alignTo: 'labelLine',
                            color: 'black',
                            fontSize: 14,
                        }
                    }
                ]
            };
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/styles/helps.scss";

    .detail-wrap {
        .chart-line {

            .lineBox {
                overflow: auto;

                .line {
                    width: 430%;
                }
            }
        }

        .chart-pie {

        }

        .titleName {
            margin: 10px 0 5px 10px;
            display: inline-block;
            @extend %subtitleName;
        }
    }
</style>