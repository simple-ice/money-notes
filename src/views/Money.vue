<template>
    <Layout class-prefix="money">
        <div class="tags">
            <ul class="current">
                <li>衣</li>
                <li>食</li>
                <li>住</li>
                <li>行</li>
            </ul>
            <div class="newTag">
                <button>新增标签</button>
            </div>
        </div>
        <label class="remark">
                <span class="name">备注</span>
                <input type="text" placeholder="在这里添加备注">
        </label>
        <ul class="types">
                <li class="selected">支出</li>
                <li>收入</li>
        </ul>
        <div class="calculator">
            <div class="number">100</div>
            <div class="numberPad">
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>删除</button>
                <button>4</button>
                <button>5</button>
                <button>6</button>
                <button>清空</button>
                <button>7</button>
                <button>8</button>
                <button>9</button>
                <button class="save">保存</button>
                <button class="zero">0</button>
                <button>.</button>
            </div>
        </div>
    </Layout>
</template>

<script lang="ts">
    export default {
        name: 'Money'
    };
</script>

<style lang="scss">
    .money-content{
        display: flex;
        align-content: flex-end;
        flex-wrap: wrap;
    }
</style>

<style lang="scss" scoped>
    @import "~@/assets/styles/helps.scss";
    .tags{
        width: 100%;
        font-size: 14px;
        padding: 16px;
        overflow: auto;
        .current{
            display: flex;
            flex-wrap: wrap;
            > li{
                background: #D9D9D9;
                $h: 24px;
                height: $h;
                line-height: $h;
                border-radius: $h/2;
                padding: 0 16px;
                margin-right: 12px;
                margin-top: 10px;
            }
        }
        .newTag{
            padding-top: 16px;
            > button{
                background: transparent;
                border: none;
                border-bottom: 1px solid;
                padding: 0 4px;
                color: #999999;
            }
        }
    }
    .remark{
        width: 100%;
        font-size: 14px;
        background: #f5f5f5;
        padding-left: 16px;
        display: flex;
        align-items: center;
        .name{
            padding-right: 16px;
        }
        > input{
            height: 73px;
            flex-grow: 1;
            padding-right: 16px;
            background: transparent;
            border: none;
        }
    }
    .types{
        width: 100%;
        font-size: 24px;
        display: flex;
        text-align: center;
        > li {
            background: #C4C4C4;
            width: 50%;
            height: 73px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            &.selected::after{
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: #333;
            }
        }
    }
    .calculator{
        width: 100%;
        .number{
            @extend %innerShadow;
            font-size: 36px;
            font-family: Consolas, monospace;
            text-align: right;
            padding: 9px 16px;
        }
        .numberPad{
            @extend %clearFix;
            > button{
                float: left;
                width: 25%;
                height: 64px;
                background: transparent;
                border: none;
                &.save{
                    height: 64*2px;
                    float: right;
                }
                &.zero{
                    width: 25%*2;
                }
                $bg: #F2F2F2;
                &:nth-child(1){
                    background: $bg;
                }
                &:nth-child(2), &:nth-child(5){
                    background: darken($bg, 6%);
                }
                &:nth-child(3), &:nth-child(6), &:nth-child(9){
                    background: darken($bg, 4*3%);
                }
                &:nth-child(4), &:nth-child(7), &:nth-child(10){
                    background: darken($bg, 4*5%);
                }
                &:nth-child(8), &:nth-child(11), &:nth-child(13){
                    background: darken($bg, 4*7%);
                }
                &:nth-child(14){
                    background: darken($bg, 4*9%);
                }
                &:nth-child(12){
                    background: darken($bg, 4*11%);
                }
            }
        }
    }
</style>