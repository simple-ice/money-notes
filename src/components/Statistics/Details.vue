<template>
    <div>
        <div class="details">
            <div class="bill-details">
                <span>账单详情</span>
                <div class="btn">
<!--                    <button>修改</button>-->
                    <button @click="deleteRecord">删除</button>
                </div>
            </div>
            <div class="bill-amount">
                <span>金额</span>
                <span :class="record.type === '-' ? 'fontColorPay' : 'fontColorIncome'">{{record.type+record.amount}}</span>
            </div>
            <div class="bill-tags">
                <span>分类</span>
                <span>{{record.tags.map(tag => tag.name).join(',')}}</span>
            </div>
            <div class="bill-time">
                <span>时间</span>
                <span>{{dayjs(this.record.createAt).format('YYYY-MM-DD HH:mm')}}</span>
            </div>
            <div class="bill-remark">
                <span>备注</span>
                <span>{{record.remark || '无'}}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';
    import dayjs from 'dayjs';
    @Component
    export default class Details extends Vue {
        @Prop({required: true, type: Object}) record!: RecordItem;
        @Prop(Boolean) isShowDetails!: boolean;
        dayjs = dayjs;
        deleteRecord(){
            this.$store.commit('deleteRecord', this.record._id);
            this.$emit('update:isShowDetails',!this.isShowDetails);
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/styles/helps.scss";
    .fontColorPay{
        color: $color-pay;
    }
    .fontColorIncome{
        color: $color-income;
    }
        .details {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 30vh;
            background: white;
            padding: 12px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;


            > div {
                width: 100%;
                display: flex;
                flex-grow: 1;
                justify-content: space-between;
                align-items: center;
            }
            .bill-details{
                justify-content: space-between;
                align-items: center;
                .btn > button{
                    border: none;
                    background: none;
                    &:last-child{
                        margin-left: 25px;
                        color: orangered;
                    }
                }
            }
            .bill-amount > span:last-child{
                font-size: 21px;
            }
            .bill-remark {

                > span:first-child{
                    margin-right: 10px;
                    white-space: nowrap;
                }
                > span:last-child{
                    font-size: 14px;
                }
            }
        }
</style>