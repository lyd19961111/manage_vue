<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">{{ name }}</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>
            上次登陆时间:<span>{{ data }}</span>
          </p>
          <p>上次登陆地点:<span>浙江杭州</span></p>
        </div>
      </el-card>

      <el-card shadow="hover" style="height:522px;margin-top:20px">
        <el-table :data="tableData">
          <el-table-column show-overflow-tooltip v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val"></el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <el-col :span="16">
      <div class="num">
        <el-card shadow="hover" v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="num">¥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>

      <el-card shadow="hover">
        <echart style="height:280px" :chartData="echartData.order"></echart>
      </el-card>
      <div class="graph">
        <el-card shadow="hover">
          <echart style="height:260px" :chartData="echartData.user"></echart>
        </el-card>
        <el-card shadow="hover">
          <echart style="height:260px" :chartData="echartData.video" :isAxisChart="false"></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Echart from '../../components/EChart'
export default {
  components: {
    Echart
  },
  data() {
    return {
      name: '',
      data: '',
      // date:new Date(),
      userImg: require('../../assets/img/user.png'),
      countData: [
        // {
        //   name:'今日支付订单',
        //   value:0,
        //   icon:'success',
        //   color:'#2ec7c9'
        // },
        // {
        //   name:'今日收藏订单',
        //   value:11234,
        //   icon:'success',
        //   color:'#ffb980'
        // },
        // {
        //   name:'今日未支付订单',
        //   value:12134,
        //   icon:'s-goods',
        //   color:'#5ab1ef'
        // },
        // {
        //   name:'本月支付订单',
        //   value:1234,
        //   icon:'success',
        //   color:'#2ec7c9'
        // },
        // {
        //   name:'本月收藏订单',
        //   value:1234,
        //   icon:'success',
        //   color:'#2ec7c9'
        // },
        // {
        //   name:'本月未支付订单',
        //   value:1234,
        //   icon:'success',
        //   color:'#2ec7c9'
        // }
      ],
      tableData: [],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      echartData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      }
    }
  },
  methods: {
    getTableData() {
      this.$http.get('/home/getData').then(res => {
        res = res.data
        this.tableData = res.data.tableData
        this.countData = res.data.countDATA
        this.name = res.data.username
        this.data = res.data.time
        //console.log('username',res.data.username)
        //console.log('value',res.data.countDATA)
        //   console.log(this.tableData)
        console.log('all-date', res.data)
        //订单折线图
        const order = res.data.orderData
        this.echartData.order.xData = order.date
        //第一步取出series中的name部分----键名
        let keyArray = Object.keys(order.data[0])
        console.log('折线图name', keyArray)
        //第二部，循环添加数据
        keyArray.forEach(key => {
          this.echartData.order.series.push({
            name: key === 'wechat' ? '小程序' : key,
            data: order.data.map(item => item[key]),
            type: 'line'
          })
        })

        //用户柱状图
        this.echartData.user.xData = res.data.userData.map(item => item.date)
        this.echartData.user.series.push({
          name: '新增用户',
          data: res.data.userData.map(item => item.new),
          type: 'bar'
        })
        this.echartData.user.series.push({
          name: '活跃用户',
          data: res.data.userData.map(item => item.active),
          type: 'bar',
          barGap: 0
        })
        //视频饼图
        this.echartData.video.series.push({
          data: res.data.videoData,
          type: 'pie'
        })
      })
    }
  },
  created() {
    this.getTableData()
  },
  mounted() {
    // this.$http.get('/home/getData').then(
    //   res=>{
    //     console.log(res.data)
    //   }
    // )
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/home';
</style>
