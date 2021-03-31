<template>
  <div style="height: 100%" ref="echart">
    echart
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: []
        }
      }
    },
    isAxisChart: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    }
  },
  watch: {
    chartData: {
      handler: function() {
        this.initChart()
      },
      deep: true
    },
    isCollapse() {
      setTimeout(() => {
        this.resizeChart()
      }, 300)
    }
  },
  data() {
    return {
      echart: null,
      axisOption: {
        legend: { //图例组件
          textStyle: { //文本颜色
            color: '#333'
          }
        },
        grid: {
          left: '20%'
        },
        tooltip: { //悬浮显示
          trigger: 'axis'  //坐标轴触发
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLine: { 
            lineStyle: { //x坐标轴线的颜色
              color: '#17b3a3'
            }
          },
          axisLabel: { //x轴文本颜色
            color: '#333'
          }
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {  //y坐标轴线的颜色
                color: '#17b3a3'
              }
            }
          }
        ],
        color: [
          '#2ec7c9',
          '#b6a2de',
          '#5ab1ef',
          '#ffb980',
          '#d87a80',
          '#8d98b3',
          '#e5cf0d',
          '#97b552',
          '#95706d',
          '#dc69aa',
          '#07a2a4',
          '#9a7fd1',
          '#588dd5',
          '#f5994e',
          '#c05050',
          '#59678c',
          '#c9ab00',
          '#7eb00a',
          '#6f5553',
          '#c14089'
        ],//颜色选择
        series: []
      },
      normalOption: {
        tooltip: {
          trigger: 'item'
        },
        color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
        series: []
      }
    }
  },
  methods: {
    initChart() {
      this.initChartData()
      if (this.echart) {
        this.echart.setOption(this.options)
      } else {
        this.echart = echarts.init(this.$refs.echart)
        this.echart.setOption(this.options)
      }
    },
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData
        this.axisOption.series = this.chartData.series
      } else {
        this.normalOption.series = this.chartData.series
      }
    },
    resizeChart() {
      //改变图标尺寸，在容器大小发生改变是需要手动调用
      this.echart ? this.echart.resize() : ''
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeChart)
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeChart)
  }
}
</script>

<style lang="scss" scoped></style>
