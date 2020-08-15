<template>
    <Layout>
        <!--        <Types class-prefix="stats" :value.sync="dateType"/>-->
        <Tabs class-prefix="stats" :data-tabs="moneyTypeList" :selectedValue.sync="moneyType"/>
        <Tabs class-prefix="period" :data-tabs="periodList" :selectedValue.sync="period"/>
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