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
            const chartWrap = this.$refs.chartWrap as HTMLDivElement;
            const app = document.getElementById('app') as HTMLDivElement;
            chartWrap.style.height = app.offsetWidth + 'px';
            if (this.options === undefined) {
                return console.error('options不能为空');
            }
            this.chart = echarts.init(chartWrap, 'light');
            this.chart.setOption(this.options);
        }

        @Watch('options', {immediate: true})
        onChartChange(value: EChartOption) {
            if (this.chart) {
                this.chart.setOption(value);
            }
        }

    }
</script>

<style lang="scss" scoped>
</style>