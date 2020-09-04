<template>
    <div class="chart" ref="chartWrap">

    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop, Watch} from 'vue-property-decorator';
    import echarts, {EChartOption, ECharts} from 'echarts';

    @Component
    export default class Chart extends Vue {
        @Prop({required: true, type: Object}) options: EChartOption | undefined;
        chart?: ECharts;

        mounted() {
            if (this.options === undefined) {
                return console.error('options不能为空');
            }
            this.chart = echarts.init(this.$refs.chartWrap as HTMLDivElement, 'light');
            this.chart.setOption(this.options);
        }

        @Watch('options', {immediate: true})
        onChartChange(value: EChartOption) {
            if (this.chart){
                this.chart.setOption(value);
            }
        }

    }
</script>

<style lang="scss" scoped>
    .chart{
        height: 300px;
    }
</style>